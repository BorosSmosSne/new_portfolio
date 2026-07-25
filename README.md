# Heng Chhay — Portfolio

Personal portfolio site for a Full-Stack Mobile Developer. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

Then visit http://localhost:3000.

Other scripts: `npm run build`, `npm start`, `npm run lint`, `npm run typecheck`.

## Editing content

All copy lives in `/data` as typed objects — you shouldn't need to touch any JSX to update the site.

| File                 | What it controls                                                                   |
| -------------------- | ---------------------------------------------------------------------------------- |
| `data/profile.ts`    | Name, title, tagline, contact details, About paragraphs, social links, resume path |
| `data/skills.ts`     | Skill groups and the pills inside them                                             |
| `data/projects.ts`   | Project cards (title, category, description, tech tags, optional repo/demo links)  |
| `data/education.ts`  | Education timeline entries                                                         |
| `data/navigation.ts` | Nav links — each `id` must match a section `id`                                    |
| `data/types.ts`      | The shape of everything above                                                      |

## Structure

```
app/
  layout.tsx      Root layout: Inter font, metadata, theme provider
  page.tsx        Assembles the sections in order
  globals.css     The only stylesheet — Tailwind layers + a few base defaults
  icon.svg        Favicon
components/
  Navbar.tsx      Sticky nav, smooth-scroll links, active-section highlight
  Hero.tsx        About.tsx  Skills.tsx  Projects.tsx  Education.tsx  Contact.tsx  Footer.tsx
  Section.tsx     Shared section shell (id, heading block, spacing)
  Reveal.tsx      Scroll-triggered fade-in/slide-up wrapper
  Tag.tsx         Pill component
  ThemeProvider.tsx / ThemeToggle.tsx   Dark mode
  Icons.tsx       Inline SVG icons
hooks/
  useActiveSection.ts   IntersectionObserver that reports the section in view
data/               Site content (see table above)
public/resume.pdf   Placeholder resume — replace with your own
```

## Before you deploy

1. **Photo** — `public/profile.png` is a generic placeholder silhouette. Save your own portrait in `/public` (a 4:5 crop fits the Hero frame exactly), then update `photo.src`, `photo.width` and `photo.height` in `data/profile.ts`.
2. **Resume** — replace `public/resume.pdf` with your real PDF (keep the filename, or update `resumeUrl` in `data/profile.ts`). The current file is a placeholder.
3. **Social links** — swap the placeholder URLs in `data/profile.ts`. GitHub, LinkedIn, Facebook, Instagram and Figma are wired up; to add another platform, add it to `SocialPlatform` in `data/types.ts`, write an icon in `components/Icons.tsx`, and register it in the `socialIcons` map (TypeScript will tell you if you miss a step).
4. **Contact form** — it currently validates on the client and simulates a send; nothing is emailed yet. Open `components/Contact.tsx` and find the `WIRE UP YOUR BACKEND HERE` block inside `handleSubmit`. It has ready-to-paste snippets for Formspree or your own `app/api/contact/route.ts` route handler. Re-validate on the server if you add a route.

## Design notes

- One accent colour, defined once as `accent` in `tailwind.config.ts` — change it there and buttons, links, tags and the active nav underline all follow.
- Dark mode uses `next-themes` with Tailwind's `class` strategy; it defaults to the visitor's system preference.
- Animations use Framer Motion via the `Reveal` wrapper, and are disabled automatically for visitors with "reduce motion" enabled.
- Fully responsive; layouts shift at Tailwind's `sm`, `md` and `lg` breakpoints.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — it detects Next.js and needs no extra configuration.
