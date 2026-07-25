import type { Project } from "./types";

/**
 * PROJECTS
 * Each object renders one card in the Projects grid.
 *
 * Optional fields:
 *   repoUrl — adds a "Code" link to the card
 *   liveUrl — adds a "Live demo" link to the card
 * Leave them out and the buttons simply don't render.
 */
export const projects: Project[] = [
  {
    slug: "pos-mobile-app",
    title: "POS Mobile App",
    category: "Flutter",
    description:
      "A point-of-sale app for small retailers: processes transactions at the counter, tracks daily sales, and keeps a running record of what sold and when.",
    tech: ["Flutter", "Dart", "SQLite", "REST API"],
    // repoUrl: "https://github.com/your-username/pos-mobile-app",
  },
  {
    slug: "school-management-system",
    title: "School Management System",
    category: "Python",
    description:
      "An administrative system that manages student records and the workflows around them — enrolment, class assignment, and reporting for staff.",
    tech: ["Python", "SQL Server", "Tkinter"],
  },
  {
    slug: "library-system",
    title: "Library System",
    category: "C# + MongoDB",
    description:
      "A desktop CRUD application for managing a library's book catalogue and member records, with borrow and return tracking backed by MongoDB.",
    tech: ["C#", ".NET", "MongoDB"],
  },
  {
    slug: "phone-shop-management-system",
    title: "Phone Shop Management System",
    category: "C++",
    description:
      "Inventory and stock tracking for a phone retailer: keeps counts accurate as stock moves in and out, and flags what needs reordering.",
    tech: ["C++", "File I/O", "OOP"],
  },
  {
    slug: "to-do-list-app",
    title: "To-Do List App",
    category: "Flutter & Dart",
    description:
      "A daily task and event scheduling app with reminders and local persistence, so plans survive closing the app.",
    tech: ["Flutter", "Dart", "SQLite"],
  },
];
