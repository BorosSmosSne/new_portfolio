import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

/**
 * The single page of the portfolio.
 *
 * Each component below owns its own <section id="..."> wrapper, and those ids
 * are what the Navbar scrolls to and highlights (see data/navigation.ts).
 * To reorder the page, just reorder these components — and reorder navLinks
 * in data/navigation.ts to match.
 */
export default function HomePage() {
  return (
    <>
      {/* Skip link: first tab stop for keyboard and screen-reader users. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
