import type { SkillGroup } from "./types";

/**
 * SKILLS
 * Grouped into cards; each string becomes a pill/tag.
 * Add a new group by appending an object — the grid adapts automatically.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile",
    description: "Cross-platform apps for Android and iOS.",
    skills: ["Flutter", "Dart", "Firebase Auth", "Xcode"],
  },
  {
    title: "Backend & Payments",
    description: "APIs and the payments behind them.",
    skills: ["Laravel", "PHP", "Java Spring Boot", "REST API", "KHQR", "Stripe"],
  },
  {
    title: "Data & Tools",
    description: "How I store data and ship code.",
    skills: ["MySQL", "SQLite", "Git & GitHub", "Figma"],
  },
];
