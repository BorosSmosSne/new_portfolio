"use client";

import { useState } from "react";

import { profile } from "@/data/profile";

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
 * Right column: a contact form validated entirely on the client.
 *
 * Validation rules live in `validate()` below. Fields are checked on submit and
 * re-checked as you type once a field has already errored, so the error message
 * clears as soon as the input becomes valid.
 *
 * >>> WIRING UP A BACKEND: see the marked block inside handleSubmit(). <<<
 */

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm: FormValues = { name: "", email: "", message: "" };

/** Pragmatic email check: something@something.tld with no spaces. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an object of error messages; an empty object means the form is valid. */
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "That name looks too short.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please add a little more detail (10 characters minimum).";
  }

  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  /** Keeps state in sync and live-clears an error once the field becomes valid. */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof FormValues;
    const nextValues = { ...values, [field]: event.target.value };
    setValues(nextValues);

    if (errors[field]) {
      const fieldError = validate(nextValues)[field];
      setErrors((previous) => ({ ...previous, [field]: fieldError }));
    }
  };

  /** Validates a single field when the user leaves it. */
  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof FormValues;
    setErrors((previous) => ({
      ...previous,
      [field]: validate(values)[field],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field for keyboard/screen-reader users.
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      /* ------------------------------------------------------------------
       * ▼▼▼ WIRE UP YOUR BACKEND HERE ▼▼▼
       *
       * Right now the submit is simulated locally — nothing is sent anywhere.
       * Replace the `await new Promise(...)` line below with one of these:
       *
       * 1) Formspree (no backend code needed — quickest option):
       *    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
       *      method: "POST",
       *      headers: { "Content-Type": "application/json", Accept: "application/json" },
       *      body: JSON.stringify(values),
       *    });
       *    if (!response.ok) throw new Error("Request failed");
       *
       * 2) Your own Next.js route handler (create app/api/contact/route.ts,
       *    validate again on the server, then send with Resend/Nodemailer):
       *    const response = await fetch("/api/contact", {
       *      method: "POST",
       *      headers: { "Content-Type": "application/json" },
       *      body: JSON.stringify(values),
       *    });
       *    if (!response.ok) throw new Error("Request failed");
       *
       * Always re-validate on the server: client-side checks are for UX only.
       * ------------------------------------------------------------------ */
      await new Promise((resolve) => setTimeout(resolve, 700));
      /* ▲▲▲ END BACKEND WIRING ▲▲▲ */

      setStatus("success");
      setValues(emptyForm);
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

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
              <div className="mt-3 flex items-center gap-3">
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
              noValidate /* we handle validation ourselves for consistent messages */
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
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    Something went wrong sending your message. Please email me
                    directly at {profile.email}.
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
