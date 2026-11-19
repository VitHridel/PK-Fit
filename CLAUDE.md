# PK-Fit

Public presentation site of Petra Konrádová, fitness trainer — https://pk-fit.cz.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS 4 (CSS-first `@theme` in `src/app/globals.css`) · shadcn/ui (`src/components/ui`) · `motion` · `next-themes` · react-hook-form + zod · nodemailer · sanitize-html · Vitest + Testing Library · Playwright + axe. Hosted as a Node server (`next start`).

Not allowed: MUI, Emotion, Formik, yup, axios, `@fontsource`.

## Commands (pnpm only)

- `pnpm dev` — dev server
- `pnpm build` / `pnpm start` — production build / server
- `pnpm lint` — ESLint + `tsc --noEmit`
- `pnpm format` — Prettier
- `pnpm test` — unit tests (Vitest, `tests/unit`); `pnpm test <pattern>` to filter
- `pnpm test:e2e` — Playwright (`tests/e2e`), runs against `pnpm build && pnpm start -p 3100` with test env (see `playwright.config.ts`)

## Conventions

- **Language:** site content in Czech (`<html lang="cs">`); code, comments, commits and docs in English.
- **Code style:** 4-space indent, single quotes, no semicolons (Prettier enforces).
- **Content** lives as typed modules in `src/content/` (services, courses, references, seminars, gallery, GDPR, site/contact info, nav). Edit content there, not in components.
- **Testable logic** lives in `src/lib/` (course split/date formatting, blog data, sanitizing, JSON-LD, contact form server code).
- **Components:** sections are server components; client components only for interaction or animation (nav, theme toggle, expanders, contact form, scroll reveal).
- **URLs that must keep working:** `/`, `/#sluzby`, `/#kurzy`, `/#o-mne`, `/#seminare`, `/#reference`, `/#kontakt`, `/zasady-zpracovani-osobnich-udaju-gdpr`.
- **Accessibility:** WCAG 2.2 AA in both themes; honor `prefers-reduced-motion`.

## Blog seam

`src/lib/blog.ts` (`getPosts`, `getPost`, `Post` type) is the only module the CMS (Craft) integration replaces. The body arrives as HTML and is sanitized server-side (`src/lib/sanitize.ts`) before rendering. Remote images are allowed only from `https://main-craft.cms-craft.com/`.

## Environment

See `.env.template`. Besides the Turnstile/SMTP/social vars:

- `BLOG_SOURCE` — `mock` uses `src/content/blog-mock.ts`; anything else throws until the CMS integration exists. Mock posts must never reach production.
- `MAIL_TRANSPORT` — `json` makes nodemailer log instead of send (tests/dev). SMTP setup (host from env, port 25, no TLS) is the owner's infra — do not change it.

## Design process

Every section's visual design goes through the **impeccable** skill and is approved by the owner before the next section starts.

## Legacy

`legacy/` holds the old Next 13 / MUI code as read-only reference while porting. Never import from it; it is deleted at the end of the migration.
