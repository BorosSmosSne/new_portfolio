import { profile } from "@/data/profile";

import { socialIcons } from "./Icons";

/**
 * FOOTER
 * Copyright line, short tagline, and the social links again.
 * The year is computed at render time, so it never goes stale.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto w-full max-w-content px-6 py-10 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {profile.name}
              <span className="text-accent">.</span>
            </p>
            {/* Short tagline */}
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
              {profile.title} — building mobile apps end to end.
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
              &copy; {year} {profile.name}. All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
