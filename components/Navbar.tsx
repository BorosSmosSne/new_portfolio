"use client";

import { useEffect, useState } from "react";

import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";

import { CloseIcon, MenuIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky navigation bar.
 *
 * Three behaviours worth knowing about:
 *  1. Active link — useActiveSection watches the sections with an
 *     IntersectionObserver and returns the id currently being read; that link
 *     gets the accent colour and an underline.
 *  2. Scrolled state — once the page scrolls past ~10px the bar gains a blurred
 *     background and a hairline border, so it reads as "floating" over content.
 *  3. Mobile menu — below `md` the links collapse into a toggle panel that
 *     closes on selection.
 *
 * Scrolling itself is plain anchor links (`#about`) plus `scroll-smooth` on
 * <html>, so it works without JavaScript and keeps the URL shareable.
 */

// Module-level so the array identity is stable across renders (the hook's effect
// depends on it).
const navIds = navLinks.map((link) => link.id);

export function Navbar() {
  const activeId = useActiveSection(navIds);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // capture the state on load (e.g. a refresh mid-page)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel if the viewport grows to desktop width.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6 sm:px-8"
      >
        {/* Wordmark — jumps back to the hero */}
        <a
          href="#hero"
          className="text-base font-bold tracking-tight text-slate-900 dark:text-white"
        >
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right-hand controls */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950"
      >
        <ul className="mx-auto w-full max-w-content px-6 py-3 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-md px-2 py-3 text-base font-medium transition-colors ${
                  activeId === link.id
                    ? "text-accent"
                    : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
