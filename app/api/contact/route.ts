import { NextResponse } from "next/server";

import { profile } from "@/data/profile";
import {
  HONEYPOT_FIELD,
  normalizeContactValues,
  validateContactForm,
} from "@/lib/contact";
import { createRateLimiter } from "@/lib/rate-limit";

/**
 * POST /api/contact — receives a contact form submission and emails it to you.
 *
 * Delivery uses Resend's HTTP API through plain `fetch`, so no email SDK is
 * needed as a dependency.
 *
 * ----------------------------------------------------------------------------
 * SETUP (takes about five minutes)
 *   1. Create a free account at https://resend.com and copy an API key.
 *   2. Add to `.env.local` (see .env.example):
 *        RESEND_API_KEY=re_your_key_here
 *   3. Optional overrides:
 *        CONTACT_TO_EMAIL    where messages are delivered
 *                            (defaults to profile.email)
 *        CONTACT_FROM_EMAIL  the sender address. Defaults to Resend's shared
 *                            test sender, which can ONLY deliver to the address
 *                            you signed up with. To email anyone else, verify a
 *                            domain in Resend and use an address on it,
 *                            e.g. "Portfolio <hello@yourdomain.com>".
 *   4. Set the same variables in your Vercel project settings before deploying.
 *
 * Without RESEND_API_KEY the route logs submissions to the terminal in
 * development, and refuses them in production rather than pretending to send.
 * ----------------------------------------------------------------------------
 */

// Always run this fresh on the server; never cache or prerender it.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Resend's shared test sender — works with no domain setup. */
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

/** At most 3 messages per IP per minute. See lib/rate-limit.ts for caveats. */
const rateLimiter = createRateLimiter({ windowMs: 60_000, max: 3 });

/** Best-effort client IP. Proxies put the original address in x-forwarded-for. */
function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  // ---- 1. Parse the body -------------------------------------------------
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_request", message: "Expected a JSON body." },
      { status: 400 },
    );
  }

  // ---- 2. Honeypot -------------------------------------------------------
  // Bots fill every field they find. Return a normal success so they don't
  // learn they were caught, but don't send anything.
  const honeypotValue = (payload as Record<string, unknown>)?.[HONEYPOT_FIELD];
  if (typeof honeypotValue === "string" && honeypotValue.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  // ---- 3. Rate limit -----------------------------------------------------
  if (rateLimiter.isLimited(getClientKey(request))) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: "Too many messages. Please try again in a minute.",
      },
      { status: 429 },
    );
  }

  // ---- 4. Validate (again — the browser's checks are only for UX) --------
  const values = normalizeContactValues(payload);
  const errors = validateContactForm(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { error: "validation", fields: errors },
      { status: 400 },
    );
  }

  // ---- 5. Deliver --------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  if (!apiKey) {
    // Not configured. In development this is expected, so log the message and
    // let the form show success. In production, fail loudly instead of
    // silently dropping someone's message.
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] RESEND_API_KEY is not set — refusing to accept messages. See app/api/contact/route.ts for setup.",
      );
      return NextResponse.json(
        {
          error: "not_configured",
          message: "The contact form is not configured yet.",
        },
        { status: 503 },
      );
    }

    console.warn(
      "[contact] RESEND_API_KEY is not set. Message logged instead of emailed:",
    );
    console.info({ to, ...values });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Replying in your mail client goes straight back to the sender.
        reply_to: values.email,
        subject: `Portfolio message from ${values.name}`,
        text: [
          `Name:    ${values.name}`,
          `Email:   ${values.email}`,
          "",
          values.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      // Log the provider's reason (bad key, unverified sender domain, etc.)
      // server-side; never leak it to the browser.
      const detail = await response.text();
      console.error(
        `[contact] Resend responded ${response.status}: ${detail.slice(0, 500)}`,
      );
      return NextResponse.json(
        {
          error: "delivery_failed",
          message: "The message could not be delivered.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] Unexpected error sending message:", error);
    return NextResponse.json(
      {
        error: "delivery_failed",
        message: "The message could not be delivered.",
      },
      { status: 502 },
    );
  }
}
