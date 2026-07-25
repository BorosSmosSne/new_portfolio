import { Reveal } from "./Reveal";

/**
 * Shared shell for every content section.
 *
 * It owns the things that must stay consistent site-wide:
 *   - the `id` the Navbar scrolls to and highlights
 *   - `scroll-mt-20`, which stops the sticky nav from covering the heading
 *   - the max-width container and vertical rhythm
 *   - the eyebrow + title + optional subtitle heading block
 *
 * Change the spacing or heading style here and every section follows.
 */
type SectionProps = {
  id: string;
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Extra classes on the <section>, e.g. an alternating background. */
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-20 py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-content px-6 sm:px-8">
        {/* Heading block */}
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              {subtitle}
            </p>
          ) : null}
          {/* Short accent rule under the heading */}
          <div className="mt-6 h-px w-16 bg-accent" />
        </Reveal>

        {/* Section body */}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
