import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * ABOUT
 * Two columns on desktop: the bio paragraphs on the left, a small stat card on
 * the right. The bio text comes from `profile.about` (one paragraph per array
 * item) so you can add or remove paragraphs without touching this file.
 *
 * The stats are derived from the data files, so they stay correct as you add
 * projects or skills.
 */
export function About() {
  // Total number of individual skills across all groups.
  const skillCount = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0,
  );

  const stats = [
    { value: `${projects.length}`, label: "Projects built" },
    { value: `${skillCount}`, label: "Tools & technologies" },
    { value: "Flutter", label: "Primary framework" },
    { value: "MIS", label: "Academic background" },
  ];

  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineering across the whole stack"
      subtitle={profile.summary}
    >
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Bio */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {profile.about.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stat card */}
        <div className="lg:col-span-2">
          <Reveal direction="left">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-slate-200 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-800">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-6 dark:bg-slate-950"
                >
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
