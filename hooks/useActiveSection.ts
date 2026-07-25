"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the Navbar can highlight it.
 *
 * How it works: one IntersectionObserver watches every section id passed in.
 * Among all sections currently intersecting the "reading band" of the viewport,
 * it picks the topmost one — which is what a reader perceives as the current
 * section. The rootMargin trims the band to roughly the upper-middle of the
 * screen so the highlight changes at a natural moment rather than at the very
 * bottom edge.
 *
 * @param ids Section element ids, in page order (see data/navigation.ts).
 * @returns The id of the active section ("" before the first match).
 */
export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Ignore the area under the sticky nav (top) and the bottom 55% of the
        // viewport, leaving a band where the "current" section is decided.
        rootMargin: "-80px 0px -55% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));

    // Edge case: at the very bottom of the page the last section may never win
    // the band test, so highlight it explicitly.
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (atBottom) setActiveId(ids[ids.length - 1]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ids]);

  return activeId;
}
