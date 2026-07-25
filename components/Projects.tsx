import { projects } from "@/data/projects";

import { GitHubIcon, ExternalLinkIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { Tag } from "./Tag";

/**
 * PROJECTS
 * A responsive card grid driven entirely by data/projects.ts:
 * 1 column on mobile, 2 on tablet, 3 on desktop.
 *
 * Each card shows the category as an eyebrow, the title, the description, and
 * the tech stack as neutral pills. The "Code" and "Live demo" links only appear
 * when `repoUrl` / `liveUrl` are set on the project, so there are never any
 * dead links.
 */
export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      subtitle="Mobile, desktop and back-office systems — each one taken from idea to working software."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.slug} className="h-full">
            <Reveal delay={index * 0.08} className="h-full">
              <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-accent/40">
                {/* Category eyebrow */}
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {project.category}
                </p>

                {/* Title */}
                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                  {project.title}
                </h3>

                {/* Description — flex-1 pushes the tags to the card bottom so
                    every card in a row lines up regardless of text length. */}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.description}
                </p>

                {/* Tech stack */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li key={tech}>
                      <Tag variant="neutral">{tech}</Tag>
                    </li>
                  ))}
                </ul>

                {/* Optional links */}
                {project.repoUrl || project.liveUrl ? (
                  <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-accent dark:text-slate-400 dark:hover:text-accent"
                      >
                        <GitHubIcon className="h-4 w-4" />
                        Code
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-accent dark:text-slate-400 dark:hover:text-accent"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        Live demo
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
