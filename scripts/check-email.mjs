#!/usr/bin/env node
/**
 * Contact form email checker.
 *
 *   npm run check:email            send a real test email
 *   npm run check:email -- --dry   show the configuration only, send nothing
 *
 * Reads .env.local (then .env) the same way Next.js does, reports what it
 * found, and translates Resend's error responses into plain instructions.
 * Run this instead of guessing why the form isn't delivering.
 *
 * Nothing here is bundled into the site — it's a local developer tool.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";

const bold = (text) => `\u001b[1m${text}\u001b[0m`;
const red = (text) => `\u001b[31m${text}\u001b[0m`;
const green = (text) => `\u001b[32m${text}\u001b[0m`;
const yellow = (text) => `\u001b[33m${text}\u001b[0m`;
const dim = (text) => `\u001b[2m${text}\u001b[0m`;

/**
 * Minimal .env parser: `KEY=value` lines, `#` comments, optional surrounding
 * quotes. Values already present in the real environment win, matching how
 * Next.js treats shell variables.
 */
function loadEnvFile(filename) {
  const path = join(process.cwd(), filename);
  if (!existsSync(path)) return { found: false, vars: {} };

  const vars = {};
  for (const rawLine of readFileSync(path, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equals = line.indexOf("=");
    if (equals === -1) continue;

    const key = line.slice(0, equals).trim();
    let value = line.slice(equals + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return { found: true, vars };
}

/** The recipient default comes from data/profile.ts, the single source of truth. */
function profileEmail() {
  try {
    const source = readFileSync(join(process.cwd(), "data/profile.ts"), "utf8");
    return source.match(/email:\s*"([^"]+)"/)?.[1] ?? null;
  } catch {
    return null;
  }
}

// --- gather configuration --------------------------------------------------
const local = loadEnvFile(".env.local");
const base = loadEnvFile(".env");
const fileVars = { ...base.vars, ...local.vars };

const read = (name) => {
  const value = (process.env[name] ?? fileVars[name] ?? "").trim();
  return value || undefined;
};

const apiKey = read("RESEND_API_KEY");
const to = read("CONTACT_TO_EMAIL") ?? profileEmail();
const from = read("CONTACT_FROM_EMAIL") ?? DEFAULT_FROM;
const dryRun =
  process.argv.includes("--dry") || process.argv.includes("--dry-run");

console.log(bold("\nContact form email check\n"));
console.log(
  `  .env.local        ${local.found ? green("found") : yellow("not found")}`,
);
console.log(
  `  RESEND_API_KEY    ${
    apiKey
      ? green(
          `set (${apiKey.length} chars, starts with "${apiKey.slice(0, 3)}")`,
        )
      : red("missing")
  }`,
);
console.log(`  delivers to       ${to ?? red("unknown")}`);
console.log(
  `  sends from        ${from}${read("CONTACT_FROM_EMAIL") ? "" : dim(" (default)")}`,
);
console.log("");

// --- no key: explain and stop ---------------------------------------------
if (!apiKey) {
  console.log(red(bold("Not configured — the form cannot send email yet.\n")));
  console.log("To fix it:");
  console.log("  1. Create a free account at https://resend.com");
  console.log("  2. Go to API Keys and create one (it starts with 're_')");
  console.log(
    `  3. Put it in ${bold(".env.local")} in this folder:\n       RESEND_API_KEY=re_your_key_here`,
  );
  console.log("  4. Run this check again, then restart 'npm run dev'\n");
  console.log(
    dim(
      "  .env.local is gitignored, so the key never reaches GitHub.\n" +
        "  For a deployed site, set the same variable in your host's dashboard\n" +
        "  (Vercel: Settings -> Environment Variables) and redeploy.\n",
    ),
  );
  process.exit(1);
}

if (!to) {
  console.log(
    red(
      "Could not work out a recipient. Set CONTACT_TO_EMAIL in .env.local.\n",
    ),
  );
  process.exit(1);
}

if (dryRun) {
  console.log(dim("--dry given, so no email was sent.\n"));
  process.exit(0);
}

// --- send a real test email ----------------------------------------------
console.log(`Sending a test email to ${bold(to)}...\n`);

let response;
try {
  response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Portfolio contact form test",
      text:
        "This is a test from scripts/check-email.mjs.\n\n" +
        "If you are reading this, your contact form can deliver email.",
    }),
  });
} catch (error) {
  console.log(red(bold("Could not reach Resend.\n")));
  console.log(`  ${error.message}\n`);
  console.log(
    "Usually a network or proxy problem rather than a code problem.\n",
  );
  process.exit(1);
}

const bodyText = await response.text();

if (response.ok) {
  console.log(green(bold("Success — Resend accepted the email.\n")));
  console.log(
    `  Check the inbox for ${to} (look in spam too, the first time).`,
  );
  console.log(dim(`  Resend response: ${bodyText.slice(0, 200)}\n`));
  console.log(
    "Your contact form is ready. Restart 'npm run dev' if it's running.\n",
  );
  process.exit(0);
}

// --- translate the failure ------------------------------------------------
console.log(
  red(bold(`Resend rejected the request (HTTP ${response.status}).\n`)),
);
console.log(dim(`  ${bodyText.slice(0, 400)}\n`));

const lower = bodyText.toLowerCase();

if (response.status === 401) {
  console.log(
    "The API key was not accepted. Check for a typo, or create a new",
  );
  console.log("key at https://resend.com/api-keys and update .env.local.\n");
} else if (lower.includes("testing emails") || lower.includes("own email")) {
  console.log(bold("This is the shared test sender restriction.\n"));
  console.log(
    `The default sender can only deliver to the address you registered with\n` +
      `Resend. You are trying to send to ${to}.\n`,
  );
  console.log("Either:");
  console.log(`  - sign in to Resend with ${to}, or`);
  console.log("  - set CONTACT_TO_EMAIL to your Resend account address, or");
  console.log(
    "  - verify your own domain at https://resend.com/domains and set\n" +
      '    CONTACT_FROM_EMAIL="Portfolio <hello@yourdomain.com>"\n',
  );
} else if (lower.includes("domain") && lower.includes("verif")) {
  console.log("The sender domain is not verified. Either remove");
  console.log(
    "CONTACT_FROM_EMAIL to fall back to Resend's test sender, or verify",
  );
  console.log("your domain at https://resend.com/domains.\n");
} else if (response.status === 422) {
  console.log("Resend considered the request invalid — usually a malformed");
  console.log("from/to address. Check both values printed above.\n");
} else if (response.status === 429) {
  console.log("Rate limited by Resend. Wait a moment and try again.\n");
}

process.exit(1);
