import Image from "next/image";

import { profile } from "@/data/profile";

import { ArrowDownIcon, DownloadIcon, MapPinIcon, socialIcons } from "./Icons";
import { Reveal } from "./Reveal";

/**
 * HERO
 * The first screen: portrait photo alongside name, title, tagline and two CTAs.
 *
 * - Two columns from `lg` up (text left, photo right); stacked on smaller
 *   screens with the text first so the page still reads top-down.
 * - "View my work" is a plain anchor to #projects, so smooth scrolling comes
 *   free from `scroll-smooth` on <html> (see app/layout.tsx).
 * - "Download Resume" points at profile.resumeUrl — put your PDF at
 *   /public/resume.pdf to replace the placeholder. The `download` attribute
 *   makes the browser save it instead of navigating to it.
 *
 * All copy, the photo path and the social links live in data/profile.ts.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Decorative background: a soft accent glow, plus a faint grid.
          Purely visual — hidden from assistive tech. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl dark:bg-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.300)_1px,transparent_0)] [background-size:32px_32px] opacity-40 dark:bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.700)_1px,transparent_0)] dark:opacity-30" />
      </div>

      <div className="relative mx-auto w-full max-w-content px-6 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Text column ---------- */}
          <div className="lg:col-span-7">
            {/* Availability pill — delete this block if you'd rather not show it */}
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent dark:bg-accent/15 dark:text-blue-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to new opportunities
              </span>
            </Reveal>

            {/* Name */}
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
                {profile.name}
              </h1>
            </Reveal>

            {/* Title */}
            <Reveal delay={0.1}>
              <p className="mt-4 text-xl font-semibold text-accent sm:text-2xl">
                {profile.title}
              </p>
            </Reveal>

            {/* Tagline */}
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
                {profile.tagline}
              </p>
            </Reveal>

            {/* Location */}
            <Reveal delay={0.2}>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                <MapPinIcon className="h-4 w-4" />
                {profile.location}
              </p>
            </Reveal>

            {/* Calls to action */}
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {/* Primary CTA — scrolls to the Projects section */}
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
                >
                  View my work
                  <ArrowDownIcon className="h-4 w-4" />
                </a>

                {/* Secondary CTA — downloads the PDF from /public */}
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </Reveal>

            {/* Social links */}
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {profile.socials.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-slate-400 dark:hover:border-accent dark:hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ---------- Photo column ---------- */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.15}>
              {/* max-w keeps the portrait a sensible size on phones and tablets */}
              <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-none">
                {/* Offset accent frame behind the photo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-accent/40"
                />

                {/* aspect-[4/5] matches the source image, so the frame is filled
                    exactly and nothing gets cropped unexpectedly. */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
                  <Image
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    width={profile.photo.width}
                    height={profile.photo.height}
                    // priority: this is the largest above-the-fold image, so it
                    // should not be lazy-loaded.
                    priority
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 20rem, 17rem"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
