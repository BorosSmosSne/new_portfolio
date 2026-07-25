import type { NavLink } from "./types";

/**
 * NAV LINKS
 * The `id` of each link must match the `id` on the corresponding <section> in
 * app/page.tsx. The Navbar uses these ids both for smooth scrolling and for
 * highlighting the section currently in view.
 *
 * Order matters: it defines the order in the nav bar and the active-section
 * detection order.
 */
export const navLinks: NavLink[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/** All section ids on the page, including the hero (not shown in the nav). */
export const sectionIds = ["hero", ...navLinks.map((link) => link.id)];
