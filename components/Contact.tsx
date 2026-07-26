"use client";

import { useState } from "react";

import { profile } from "@/data/profile";
import {
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from "@/lib/contact";

import {
  CheckCircleIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  socialIcons,
} from "./Icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * CONTACT
 * Left column: contact details + social links (all from data/profile.ts).
 * Right column: a working contact form.
 *
 * Submitting POSTs to /api/contact, which emails the message to you. See
 * app/api/contact/route.ts for the one environment variable it needs
 * (RESEND_API_KEY) — until that is set, submissions are logged to your terminal
 * in development rather than emailed.
 *
 * Validation rules live in lib/contact.ts and are shared with the API route, so
 * the browser and the server always agree. Fields are checked when you leave
 * them and on submit, and an error clears as soon as the field becomes valid.
 */

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm: ContactFormValues = { name: "", email: "", message: "" };

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(emptyForm);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  // Set when the server can't deliver, so the visitor is offered their own mail
  // app as a fallback rather than losing what they typed.
  const [showMailtoFallback, setShowMailtoFallback] = useState(false);
  // Hidden anti-spam field: bots fill it, people never see it.
  const [honeypot, setHoneypot] = useState("");

  /** Keeps state in sync and live-clears an error once the field becomes valid. */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof ContactFormValues;
    const nextValues = { ...values, [field]: event.target.value };
    setValues(nextValues);

    if (errors[field]) {
      const fieldError = validateContactForm(nextValues)[field];
      setErrors((previous) => ({ ...previous, [field]: fieldError }));
    }
  };

  /** Validates a single field when the user leaves it. */
  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof ContactFormValues;
    setErrors((previous) => ({
      ...previous,
      [field]: validateContactForm(values)[field],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field for keyboard/screen-reader users.
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    setShowMailtoFallback(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: honeypot }),
      });

      // The route replies with JSON for every outcome, but a proxy or an
      // unexpected crash could return HTML, so don't assume it parses.
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        // The server re-validates; if it disagrees with the browser, show its
        // field errors rather than a generic failure.
        if (result?.error === "validation" && result.fields) {
          setErrors(result.fields as ContactFormErrors);
          setStatus("idle");
          return;
        }

        setStatus("error");
        setErrorMessage(
          typeof result?.message === "string"
            ? result.message
            : "Something went wrong sending your message.",
        );
        // Rate limiting is temporary, so retrying is the right advice there.
        // Every other failure means the server can't deliver, so hand the
        // visitor a prefilled email instead of losing their message.
        setShowMailtoFallback(result?.error !== "rate_limited");
        return;
      }

      setStatus("success");
      setValues(emptyForm);
      setErrors({});
    } catch {
      // Network-level failure: offline, DNS, request blocked.
      setStatus("error");
      setErrorMessage(
        "Could not reach the server. Please check your connection.",
      );
      setShowMailtoFallback(true);
    }
  };

  /**
   * A `mailto:` link carrying whatever the visitor typed. Used as the escape
   * hatch when the server can't send the message itself — one click opens their
   * mail app with everything already filled in.
   */
  const mailtoFallbackHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Portfolio message from ${values.name || "a visitor"}`,
  )}&body=${encodeURIComponent(
    [`Name: ${values.name}`, `Email: ${values.email}`, "", values.message].join(
      "\n",
    ),
  )}`;

  // Contact details, built from data/profile.ts.
  const details = [
    {
      icon: MailIcon,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: PhoneIcon,
      label: "Phone",
      value: profile.phone,
      // tel: links can't contain spaces or dashes.
      href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: profile.location,
      href: undefined,
    },
  ];

  // Shared input classes; the error variant swaps the border colour.
  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600";
  const inputNormal =
    "border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600";
  const inputError = "border-red-500 dark:border-red-500";

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      subtitle="Open to junior and mid-level mobile roles, freelance work, and interesting collaborations. I usually reply within a day."
    >
      <div className="grid gap-12 lg:grid-cols-5">
        {/* ---------- Contact details ---------- */}
        <div className="lg:col-span-2">
          <Reveal>
            <ul className="space-y-5">
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <li key={detail.label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent dark:bg-accent/15 dark:text-blue-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="break-words text-base font-medium text-slate-900 transition-colors hover:text-accent dark:text-white dark:hover:text-accent"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-base font-medium text-slate-900 dark:text-white">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Social links */}
            <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">
                Elsewhere
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {profile.socials.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-400 dark:hover:border-accent dark:hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- Form ---------- */}
        <div className="lg:col-span-3">
          <Reveal direction="left">
            <form
              onSubmit={handleSubmit}
              // Validation is handled in JS so the messages are consistent
              // across browsers.
              noValidate
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-950"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={CONTACT_LIMITS.name.max}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                  className={`mt-2 ${inputBase} ${
                    errors.name ? inputError : inputNormal
                  }`}
                />
                {errors.name ? (
                  <p
                    id="name-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>

              {/* Email */}
              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={CONTACT_LIMITS.email.max}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@example.com"
                  className={`mt-2 ${inputBase} ${
                    errors.email ? inputError : inputNormal
                  }`}
                />
                {errors.email ? (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-900 dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={CONTACT_LIMITS.message.max}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  placeholder="Tell me about the role or project…"
                  className={`mt-2 resize-y ${inputBase} ${
                    errors.message ? inputError : inputNormal
                  }`}
                />
                {errors.message ? (
                  <p
                    id="message-error"
                    role="alert"
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                  >
                    {errors.message}
                  </p>
                ) : null}
              </div>

              {/* Honeypot: hidden from people, irresistible to bots.
                  Kept out of the tab order and hidden from screen readers. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={HONEYPOT_FIELD}>Company</label>
                <input
                  id={HONEYPOT_FIELD}
                  name={HONEYPOT_FIELD}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setHoneypot(event.target.value)
                  }
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              {/* Status messages — aria-live announces them to screen readers */}
              <div aria-live="polite" className="mt-4">
                {status === "success" ? (
                  <p className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                    <CheckCircleIcon className="h-5 w-5" />
                    Thanks — your message has been sent. I&rsquo;ll be in touch
                    soon.
                  </p>
                ) : null}
                {status === "error" ? (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                      {errorMessage}
                    </p>

                    {showMailtoFallback ? (
                      <>
                        {/* Nothing typed is lost: this opens the visitor's mail
                            app with the message already filled in. */}
                        <p className="mt-1 text-sm text-red-700/80 dark:text-red-400/80">
                          Your message hasn&rsquo;t been lost — send it straight
                          from your email app instead.
                        </p>
                        <a
                          href={mailtoFallbackHref}
                          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-900 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-950/60"
                        >
                          <MailIcon className="h-4 w-4" />
                          Email it to {profile.email}
                        </a>
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
