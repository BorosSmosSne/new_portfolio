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
    slug: "angkor-burger",
    title: "Angkor Burger: Ordering & Stock App",
    category: "Flutter + Laravel",
    highlights: [
      "Flutter app (Android & iOS) for a university final project, with 3 user roles, 20+ screens and ABA PayWay KHQR payments.",
      "Real-time kitchen screen and Laravel REST API with automatic stock deduction, out-of-stock marking and a daily sales report.",
    ],
    tech: ["Flutter", "Laravel", "KHQR"],
    repoUrl: "https://github.com/BorosSmosSne/angkor_burger_app",
  },
  {
    slug: "hotel-management-system",
    title: "Hotel Management System",
    category: "Laravel",
    highlights: [
      "Laravel web system with admin and staff roles for bookings, guests, payments, housekeeping and reports.",
      "Check-in and check-out with transaction-based overlap prevention, and tax invoicing with PDF export.",
    ],
    tech: ["Laravel", "PHP", "SQLite"],
    repoUrl: "https://github.com/BorosSmosSne/hotel_management_final_y4_s1",
  },
  {
    slug: "drink-shop-rest-api",
    title: "Drink Shop REST API",
    category: "Spring Boot",
    highlights: [
      "REST API for products, carts and orders, with drink customization and a transaction-safe order status workflow.",
      "Telegram bot that sends order tickets to staff, who update status with inline buttons.",
    ],
    tech: ["Java", "Spring Boot", "MySQL"],
    repoUrl: "https://github.com/BorosSmosSne/final_web_springboot",
  },
  {
    slug: "membership-website",
    title: "Membership Website",
    category: "Stripe",
    highlights: [
      "Recurring billing with Stripe Checkout, Silver and Gold plans, and signature-verified webhooks that sync membership status.",
      "Plan upgrades, scheduled downgrades, the Stripe Customer Portal, and CSRF-protected login.",
    ],
    tech: ["PHP", "MySQL", "Stripe API"],
    repoUrl: "https://github.com/BorosSmosSne/subcription_web",
  },
  {
    slug: "groceries-app",
    title: "Groceries App",
    category: "Flutter & Dart",
    highlights: [
      "Product management app with login validation, a product list and detail screens.",
      "Full CRUD with image upload against a REST API, plus swipe-to-delete.",
    ],
    tech: ["Flutter", "Dart", "REST API"],
    repoUrl: "https://github.com/BorosSmosSne/groceries_app",
  },
];
