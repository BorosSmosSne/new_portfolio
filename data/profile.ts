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
    "I build cross-platform mobile apps end-to-end — from the interface people tap to the database and APIs behind it.",
  location: "Phnom Penh, Cambodia",
  email: "hengchhay2004@gmail.com",
  phone: "088-517-2546",

  summary:
    "Full-stack mobile developer with a Management Information Systems background. Builds cross-platform apps with Flutter and backs them with solid databases, APIs, and system design.",

  // About section copy — one array item per paragraph.
  about: [
    "I'm a full-stack mobile developer with a background in Management Information Systems, which means I think about software the way a business does: what data matters, who touches it, and how it flows through a system. That perspective shapes how I plan a feature before I write a line of code.",
    "My main toolkit is Flutter and Dart for cross-platform apps, backed by real data layers — MongoDB, SQL Server and SQLite — plus the APIs and system design that hold them together. I've also built desktop and back-office systems in C#, Python and C++, so I'm comfortable moving between platforms when the problem calls for it.",
    "I like owning a feature from end to end: designing the UI in Figma, wiring the logic and state, modelling the data, and getting it deployed. I'm currently finishing my degree at SETEC Institute and looking for work where I can keep shipping production software with a team that cares about craft.",
  ],

  // Drop your real PDF at /public/resume.pdf to replace the placeholder.
  resumeUrl: "/resume.pdf",

  /**
   * PORTRAIT PHOTO
   * `public/profile.png` is currently a generic placeholder silhouette.
   *
   * To use your own photo:
   *   1. Save it in /public (a portrait crop around 4:5 works best — the frame
   *      in the Hero uses that ratio).
   *   2. Point `src` at it, e.g. "/profile.jpg".
   *   3. Set `width`/`height` to the file's real pixel size.
   */
  photo: {
    src: "/profile.png",
    alt: "Heng Chhay standing against a plain wall, arms crossed",
    width: 800,
    height: 1000,
  },

  // TODO: swap these placeholder URLs for your real profiles.
  // Order here is the order they appear in the Hero, Contact and Footer.
  socials: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/your-username",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/your-profile",
    },
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/your-profile",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/your-username",
    },
    {
      platform: "figma",
      label: "Figma",
      href: "https://www.figma.com/@your-username",
    },
  ],
};
