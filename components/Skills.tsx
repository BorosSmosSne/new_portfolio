import { skillGroups } from "@/data/skills";

import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Tag } from "./Tag";

/**
 * SKILLS
 * One card per group from data/skills.ts, each skill rendered as a <Tag> pill.
 * The grid is 1 column on mobile, 3 on desktop — add a fourth group and it
 * wraps onto a new row automatically.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      subtitle="The languages, data layers and design tools I reach for when building and shipping an app."
      className="bg-slate-50 dark:bg-slate-900/40"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.1}>
            <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {group.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
                {group.description}
              </p>

              {/* Skill pills */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
