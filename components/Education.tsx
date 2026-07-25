import { education } from "@/data/education";

import { GraduationCapIcon, MapPinIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/**
 * EDUCATION
 * A vertical timeline built from data/education.ts (newest entry first).
 *
 * The line is a left border on the <ol>, and each entry positions a small
 * accent dot on top of it. The last entry gets no bottom padding so the line
 * stops cleanly at the final item.
 */
export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Where I studied"
      subtitle="A Management Information Systems track that pairs software skills with how businesses actually run."
      className="bg-slate-50 dark:bg-slate-900/40"
    >
      <ol className="relative ml-3 border-l border-slate-200 dark:border-slate-800">
        {education.map((entry, index) => (
          <li
            key={`${entry.institution}-${entry.period}`}
            className={`relative pl-8 ${
              index === education.length - 1 ? "" : "pb-10"
            }`}
          >
            {/* Timeline dot, centred on the border line */}
            <span
              aria-hidden="true"
              className="absolute -left-[9px] top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent ring-4 ring-slate-50 dark:ring-slate-900"
            >
              <GraduationCapIcon className="h-3 w-3 text-white" />
            </span>

            <Reveal delay={index * 0.1}>
              {/* Period */}
              <p className="text-sm font-semibold text-accent">
                {entry.period}
              </p>

              {/* Institution */}
              <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                {entry.institution}
              </h3>

              {/* Credential + location */}
              <p className="mt-1 text-base text-slate-600 dark:text-slate-400">
                {entry.credential}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-500">
                <MapPinIcon className="h-4 w-4" />
                {entry.location}
              </p>

              {/* Optional detail paragraph */}
              {entry.description ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {entry.description}
                </p>
              ) : null}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
