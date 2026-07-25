import type { Config } from "tailwindcss";

/**
 * Tailwind configuration.
 * - `darkMode: "class"` lets `next-themes` toggle dark mode by adding/removing
 *   the `dark` class on <html>.
 * - The single accent colour lives here as `accent`. Change these values and the
 *   whole site re-themes (buttons, links, tags, active nav underline, etc.).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#2563eb", // blue-600 — the one accent colour used site-wide
          hover: "#1d4ed8", // blue-700
          soft: "#dbeafe", // blue-100 — tag/pill backgrounds in light mode
        },
      },
      fontFamily: {
        // Wired to the `next/font` Inter instance defined in app/layout.tsx.
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem", // shared page container width
      },
    },
  },
  plugins: [],
};

export default config;
