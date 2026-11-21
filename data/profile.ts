import type { Profile } from "./types";

/**
 * PERSONAL DETAILS
 * Edit this file to change your name, contact info, bio copy and social links.
 * Nothing here is hard-coded in the components.
 */
export const profile: Profile = {
  name: "Heng Chhay",
  title: "Full-Stack Mobile Developer",
  tagline:
    "I build Flutter apps for Android and iOS, backed by Laravel and Spring Boot APIs, with real payments like KHQR and Stripe.",
  location: "Phnom Penh, Cambodia",
  email: "hengchhay2004@gmail.com",
  phone: "088 517 2546",

  summary:
    "Management Information Systems student (graduating 2027) building mobile apps with Flutter and backend APIs with Laravel and Spring Boot.",

  // About section copy — one array item per paragraph.
  about: [
    "I build Flutter apps backed by real APIs. My final-year project, Angkor Burger, is an Android and iOS ordering and stock app with ABA PayWay KHQR payments and role-based access for customers, kitchen and admin.",
    "On the backend I work with Laravel and PHP, and Java Spring Boot, using MySQL and SQLite for data. I've integrated Stripe subscriptions with signature-verified webhooks, and a Telegram bot for order tickets.",
    "I'm developing on macOS and iOS, finishing my degree at SETEC Institute, and looking for a mobile developer role where I can grow in fintech and digital payments.",
  ],

  // Drop your real PDF at /public/resume.pdf to replace the placeholder.
  resumeUrl: "/resume.pdf",

  /**
   * PORTRAIT PHOTO
   * Images live in `public/images/`. Paths here are written as if `public/` were
   * the site root, so `public/images/profiles.jpg` is referenced as
   * "/images/profiles.jpg".
   *
   * To swap the photo:
   *   1. Drop the file into `public/images/` (a 4:5 portrait crop fits the Hero
   *      frame exactly — this one is 4032x5040, which is 4:5).
   *   2. Point `src` at it.
   *   3. Set `width`/`height` to the file's real pixel size. next/image uses
   *      them to reserve the right space before the image loads; wrong values
   *      cause the page to jump as it appears.
   */
  photo: {
    src: "/images/profiles.jpg",
    alt: "Heng Chhay standing against a plain wall, arms crossed",
    width: 4032,
    height: 5040,
  },

  // Order here is the order they appear in the Hero, Contact and Footer.
  // To hide a platform, delete its entry — nothing else needs changing.
  socials: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/BorosSmosSne",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/heng-chhay-b1a672366/",
    },
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/heng.chhay.310634",
    },
    {
      // Tracking parameters (igsh, utm_source) stripped from the shared link —
      // they came from Instagram's QR share and aren't needed to reach the profile.
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/heng_chhayy",
    },
    {
      platform: "figma",
      label: "Figma",
      href: "https://www.figma.com/@hchhay",
    },
  ],
};
