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

- `BLOG_SOURCE` — `mock` uses `src/content/blog-mock.ts`; anything else throws until the CMS integration exists. Mock posts must never reach production (`ALLOW_MOCK_BLOG=1` is required to use mock in production mode).
- `MAIL_TRANSPORT` — `json` makes nodemailer log instead of send (tests/dev). SMTP setup (host from env, port 25, no TLS) is the owner's infra — do not change it.

## Local setup gotcha

The homepage (blog teaser), `/blog`, posts and `sitemap.xml` read posts at build time **and at runtime** (ISR regeneration, unknown slugs). `BLOG_SOURCE=mock` must be set for both; in production mode (`pnpm build`, `pnpm start`, e2e) mock is refused unless `ALLOW_MOCK_BLOG=1` is also set — that flag must never be set on the live server. Production launches only with the CMS integration.

## Design

- Product context: `PRODUCT.md`. Approved visual direction (development-only contract): `.impeccable/surfaces/src-app-page-tsx.md` — calm, ruled, numbered lists, real photos; paper objects (taped note, polaroids, `font-hand`) only in Courses.
- Tokens live in `src/app/globals.css` (`:root` and `.dark`); every text/background pair is WCAG AA. `accent` (#72D7D1) is decorative on light backgrounds — never text. Use `primary-ink` for small teal text, `paper-link` for links on the light paper objects.
- The hero entrance is pure CSS (`.hero-*` keyframes, `data-hero-late` on chrome); scroll reveals use `<Reveal>` (Motion). Both honour `prefers-reduced-motion`; `[data-reveal]` has a `<noscript>` override.
- Any visual change goes through the **impeccable** skill and is approved by the owner.

## Quality bar

`tests/e2e/a11y.spec.ts` runs axe (WCAG 2.2 AA) on every page in both themes and both viewports — keep it at zero violations. Lighthouse (mobile) targets: Performance ≥ 90, Accessibility / Best Practices / SEO = 100 on `/` and a blog post. Keep Motion and form code out of the root layout so blog pages don't load it.
