# PK-Fit

Website of Petra Konrádová, fitness trainer — [pk-fit.cz](https://pk-fit.cz).

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · shadcn/ui · pnpm.

## Setup

```bash
pnpm install
cp .env.template .env.local   # fill in the values; keep BLOG_SOURCE=mock for local work
pnpm dev
```

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITEKEY`, `TURNSTILE_SECRETKEY` | Cloudflare Turnstile for the contact form |
| `SMTP_HOST`, `SMTP_SENDER` | Outgoing mail for the contact form |
| `NEXT_PUBLIC_IG`, `NEXT_PUBLIC_FB` | Social profile URLs |
| `BLOG_SOURCE` | `mock` (development only) until the CMS integration. Required at build time — `pnpm build` fails without it |
| `MAIL_TRANSPORT` | `json` = don't send mail (tests/dev) |

## Scripts

| Command | |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` / `pnpm start` | Production build / server |
| `pnpm lint` | ESLint + type check |
| `pnpm format` | Prettier |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | End-to-end tests (Playwright; run `pnpm exec playwright install chromium` once) |

## Notes

- Content (services, courses, references, seminars, GDPR, copy) lives in `src/content/`.
- The blog data layer `src/lib/blog.ts` is the only module the CMS integration replaces; mock posts must never reach production.
- Tests: `pnpm test` (Vitest, `tests/unit`) and `pnpm test:e2e` (Playwright incl. axe accessibility checks, `tests/e2e`). The e2e run builds and starts the app with test env (Cloudflare Turnstile test keys, mail not sent).
