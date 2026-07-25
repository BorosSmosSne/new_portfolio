import type { SkillGroup } from "./types";

/**
 * SKILLS
 * Grouped into cards; each string becomes a pill/tag.
 * Add a new group by appending an object — the grid adapts automatically.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Programming & Frameworks",
    description: "Languages and frameworks I build products with.",
    skills: ["Flutter", "Dart", "Python", "C#", "C++", "Node.js"],
  },
  {
    title: "Databases & Tools",
    description: "How I store data and ship code.",
    skills: ["MongoDB", "SQL Server", "SQLite", "Docker", "Git"],
  },
  {
    title: "Design",
    description: "Designing the interface before building it.",
    skills: ["Figma", "UI/UX", "Blender"],
  },
];
