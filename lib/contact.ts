/**
 * Contact form rules shared by the browser and the server.
 *
 * The form validates in the browser for fast feedback, and the API route
 * validates again because anything can POST to it. Both import from this file
 * so the two can never disagree about what counts as valid.
 */

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

/** One optional message per field. An empty object means "no problems". */
export type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

/**
 * Length bounds. The maximums exist to stop someone posting a megabyte of text
 * at the email provider; the minimums just catch obviously empty submissions.
 */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  message: { min: 10, max: 5000 },
} as const;

/** Pragmatic email check: something@something.tld with no spaces. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an object of error messages; an empty object means the form is valid. */
export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = "That name looks too short.";
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name.max} characters.`;
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = "That email address is too long.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Please add a little more detail (${CONTACT_LIMITS.message.min} characters minimum).`;
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Please keep your message under ${CONTACT_LIMITS.message.max} characters.`;
  }

  return errors;
}

/**
 * Coerces an untrusted JSON body into the expected shape.
 *
 * A request body can contain anything — numbers, nested objects, missing keys —
 * so every field is forced to a trimmed string before validation runs. Without
 * this, something like `{ name: { toString: ... } }` could reach the email body.
 */
export function normalizeContactValues(input: unknown): ContactFormValues {
  const source = (input ?? {}) as Record<string, unknown>;

  const asString = (value: unknown): string =>
    typeof value === "string" ? value.trim() : "";

  return {
    name: asString(source.name),
    email: asString(source.email),
    message: asString(source.message),
  };
}

/**
 * Name of the hidden honeypot field. Real people never see or fill it, so any
 * request that has it filled in is almost certainly a bot.
 */
export const HONEYPOT_FIELD = "company";
