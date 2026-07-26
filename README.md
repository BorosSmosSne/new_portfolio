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
  api/contact/route.ts   Receives form submissions and emails them
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
lib/
  contact.ts        Form validation shared by the browser and the API route
  rate-limit.ts     Small in-memory rate limiter
data/               Site content (see table above)
public/
  images/           Photos and graphics — referenced as /images/...
    profile.png     Placeholder portrait — replace with your own
  resume.pdf        Placeholder resume — replace with your own
```

## Before you deploy

1. **Photo** — `public/images/profile.png` is a generic placeholder silhouette. Drop your own portrait into `public/images/` (a 4:5 crop fits the Hero frame exactly), then update `photo.src`, `photo.width` and `photo.height` in `data/profile.ts`. Paths are relative to `public/`, so `public/images/profile.jpg` is written as `/images/profile.jpg`.
2. **Resume** — replace `public/resume.pdf` with your real PDF (keep the filename, or update `resumeUrl` in `data/profile.ts`). The current file is a placeholder.
3. **Social links** — swap the placeholder URLs in `data/profile.ts`. GitHub, LinkedIn, Facebook, Instagram and Figma are wired up; to add another platform, add it to `SocialPlatform` in `data/types.ts`, write an icon in `components/Icons.tsx`, and register it in the `socialIcons` map (TypeScript will tell you if you miss a step).
4. **Contact form email** — add a `RESEND_API_KEY` so messages actually reach your inbox. See the section below.

## Contact form

Submitting the form POSTs to `app/api/contact/route.ts`, which emails the message to you through [Resend](https://resend.com)'s HTTP API. There's no email SDK dependency — it's a plain `fetch`.

**Setup**

1. Create a free Resend account and copy an API key.
2. `cp .env.example .env.local` and fill in `RESEND_API_KEY`.
3. Restart `npm run dev`.
4. Add the same variable in your Vercel project settings before deploying (Settings → Environment Variables).

| Variable             | Required | Default                                     |
| -------------------- | -------- | ------------------------------------------- |
| `RESEND_API_KEY`     | yes      | —                                           |
| `CONTACT_TO_EMAIL`   | no       | the `email` in `data/profile.ts`            |
| `CONTACT_FROM_EMAIL` | no       | `Portfolio Contact <onboarding@resend.dev>` |

**About the sender address:** the default uses Resend's shared test sender, which can only deliver to the email address you registered with Resend. That's fine for testing. To receive at any other address, verify your own domain in Resend and set `CONTACT_FROM_EMAIL` to an address on it.

**Behaviour worth knowing**

- Without `RESEND_API_KEY`, submissions are logged to your terminal in development. In production the route returns 503 instead, so a misconfigured deploy fails visibly rather than silently swallowing messages.
- `reply_to` is set to the sender's address, so replying in your mail client goes straight back to them.
- Validation rules live in `lib/contact.ts` and run in both the browser and the route — the browser for fast feedback, the server because anything can POST to an open endpoint.
- Spam defences: a hidden honeypot field, and a 3-per-minute-per-IP limit. The limit is in-memory, so on serverless it applies per instance; for a hard guarantee back it with Vercel KV or add a CAPTCHA.

## Design notes

- One accent colour, defined once as `accent` in `tailwind.config.ts` — change it there and buttons, links, tags and the active nav underline all follow.
- Dark mode uses `next-themes` with Tailwind's `class` strategy; it defaults to the visitor's system preference.
- Animations use Framer Motion via the `Reveal` wrapper, and are disabled automatically for visitors with "reduce motion" enabled.
- Fully responsive; layouts shift at Tailwind's `sm`, `md` and `lg` breakpoints.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — it detects Next.js and needs no extra configuration.
