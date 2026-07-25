"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps the app in next-themes so dark mode can be toggled anywhere.
 *
 * attribute="class"  -> toggles the `dark` class on <html>, which is what
 *                       Tailwind's `darkMode: "class"` strategy looks for.
 * defaultTheme="system" -> respects the visitor's OS preference on first visit;
 *                       their explicit choice is then remembered in localStorage.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
