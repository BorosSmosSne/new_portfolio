/**
 * Shared content types for the whole site.
 *
 * Every file in /data is typed against these, so if you add or rename a field
 * TypeScript will point you at every component that needs updating.
 */

/** A single nav link. `id` must match the `id` attribute on the matching <section>. */
export type NavLink = {
  id: string;
  label: string;
};

/** Personal details + social links rendered in Hero, Contact and Footer. */
export type Profile = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  /** Short version used in the Hero. */
  summary: string;
  /** Longer version used in the About section. One string per paragraph. */
  about: string[];
  /** Path (relative to /public) of the resume PDF offered for download. */
  resumeUrl: string;
  socials: SocialLink[];
};

/** Recognised social platforms. Add a case here + an icon in components/Icons.tsx. */
export type SocialPlatform = "github" | "linkedin" | "email";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

/** One skill group rendered as a card of pill/tag components. */
export type SkillGroup = {
  title: string;
  /** Short line explaining the group. Keep it to one sentence. */
  description: string;
  skills: string[];
};

/** A portfolio project card. */
export type Project = {
  /** Stable key, also used as the anchor slug if you later add detail pages. */
  slug: string;
  title: string;
  /** Primary language/framework, shown as the card's eyebrow label. */
  category: string;
  description: string;
  /** Tech-stack tags rendered as pills at the bottom of the card. */
  tech: string[];
  /** Optional links — the buttons only render when a URL is provided. */
  repoUrl?: string;
  liveUrl?: string;
};

/** A school / university entry in the Education timeline. */
export type EducationEntry = {
  institution: string;
  /** e.g. "BA, Management Information Systems" or "High School Diploma". */
  credential: string;
  period: string;
  location: string;
  description?: string;
};
