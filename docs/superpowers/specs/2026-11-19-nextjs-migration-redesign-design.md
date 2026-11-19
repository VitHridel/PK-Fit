# PK-Fit: Next.js migration & redesign — design

Date: 2026-11-19 · Status: draft for approval

## Intent

PK-Fit (pk-fit.cz) is the public presentation site of Petra Konrádová, a fitness
trainer. It is a single long homepage (+ GDPR page, 404) built on Next.js 13
Pages Router with MUI/Emotion. The owner finds the design dated and wants a more
modern look, and wants the codebase on a current stack (latest Next, App Router,
Tailwind, shadcn/ui, Motion) instead of MUI. A blog is being added.

The site's job — what a visitor should ideally do:

1. **Contact the trainer** about individual services (phone / contact form), or
2. **Get interested in a course** (courses link out to external registration),
3. ideally also **open a blog article**.

Contact and courses carry the strongest visual emphasis; blog is third.

## Goals

- Full rewrite on Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui,
  Motion for animations, pnpm. No MUI/Emotion left.
- Complete visual redesign, led by the agreed hero (below); the rest of the site
  follows the same style. Design work uses the **impeccable** skill.
- Light and dark theme with a toggle.
- New blog: `/blog` (list) and `/blog/[slug]` (detail) on mock data behind a
  swappable data layer; blog teaser section on the homepage.
- Public-site quality bar: SEO and AEO best practices, accessibility (WCAG 2.2
  AA), performance (Core Web Vitals).
- A project `CLAUDE.md` describing the new stack and conventions.

## Non-goals

- Connecting the CMS (blog data is mocked; integration comes later, separately).
- Moving homepage content (courses, references, …) to the CMS — stays as typed
  data files in the repo for now.
- i18n (site is Czech only), analytics, booking/payments, blog comments,
  pagination or categories on the blog.
- Writing new site copy, except the shortened hero text (see Open items).
- Changing hosting.

## Anti-goals (would be a failure even if it "works")

- Animations that delay content, hurt LCP, or get in the way of reading.
  Motion is an accent in the hero; elsewhere it is quiet.
- Navigation that draws attention. It is deliberately minimal — the page
  should invite scrolling on its own.
- SEO regressions: existing URLs and anchors must keep working
  (`/`, `/#sluzby`, `/#kurzy`, `/#o-mne`, `/#seminare`, `/#reference`,
  `/#kontakt`, `/zasady-zpracovani-osobnich-udaju-gdpr`).
- Content hidden in carousels (except where explicitly agreed — none now).
- A theme flash (wrong theme for a split second on load).

## Constraints

- Hosting: Node server (`next start`), as today. The server already runs
  other sites on the latest Next and pnpm — no deploy changes needed. Same env variables as
  `.env.template` (`NEXT_PUBLIC_TURNSTILE_SITEKEY`, `TURNSTILE_SECRETKEY`,
  `SMTP_HOST`, `SMTP_SENDER`, `NEXT_PUBLIC_IG`, `NEXT_PUBLIC_FB`).
- Contact form keeps Cloudflare Turnstile and nodemailer with the current SMTP
  setup (host from env, port 25, no TLS — that's the owner's mail infra).
- `master` stays live and untouched until the rewrite branch is complete.
- Code, comments, commits, docs in English; site content in Czech (`lang="cs"`).

## Approaches considered

| Approach | Trade-off | Verdict |
|---|---|---|
| **Fresh scaffold on a branch** — new Next 16 App Router project in place, delete old code, rebuild every section directly in the new design, carry over assets and content data | Branch isn't shippable until done; `master` stays live meanwhile | **Chosen** |
| Incremental migration — upgrade Next 13→16 in place, run MUI and Tailwind side by side, move pages one by one | Shippable at every step, but there is one page and the redesign touches everything; MUI baseline and Tailwind preflight fight each other; every component written twice | Rejected |
| New project in a separate repo, swap at the end | Loses git history, no benefit | Rejected |

## Decisions

### Stack & tooling

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind 4
  (CSS-first `@theme` config), shadcn/ui, `motion`, `next-themes`,
  react-hook-form + zod, nodemailer, pnpm (replaces yarn; delete `yarn.lock`).
- Removed: MUI, Emotion, Formik, yup, axios (use `fetch`), `@fontsource`.
- Poppins via `next/font` unless the impeccable pass proposes a different
  typeface (owner approves).
- SVG icons keep working as React components (svgr via Turbopack rules).
- Keep the existing code style (4-space indent, single quotes, no semicolons)
  via Prettier. *(builder's call, recorded)*

### Theming

- Light theme = current palette as the starting point: background `#E7F1F1`,
  text `#0E1414`, primary `#107974`, primary-light `#72D7D1`. impeccable may
  propose adjustments; the owner approves them.
- Dark theme (new; feels more modern): background ≈ `#0C1212`, text ≈ `#E8F0F0`,
  primary ≈ `#72D7D1` (as in the approved mockup), refined in the design pass.
- Colors are CSS-variable tokens; both themes must meet WCAG AA contrast
  (verify `#107974` on `#E7F1F1` especially — it's borderline).
- `next-themes`, class strategy: default follows the OS preference; the toggle
  overrides and persists; no flash on load.

### Header & navigation

- Top: logo top-left, theme toggle top-right. The current full-width header bar
  (horizontal menu + phone button) is removed.
- **Desktop nav:** a small vertical list on the far right, slightly below the
  top, `position: fixed` — it stays with the user over the whole page. Text
  ≈12–13 px (no smaller, legibility). Muted color; the active item is **bold
  only**, no other marker. Active item follows the section in view
  (scroll-spy). Items: služby, kurzy, o mně, semináře, reference, blog, kontakt.
  `blog` goes to `/blog`; the rest are `/#anchor` links so they work from blog
  pages too. Real `<nav>`, keyboard-accessible, visible focus styles.
- **Mobile nav:** floating pill bar at the bottom (thumb reach), hides on scroll
  down, shows on scroll up. Shows ~4 items + "⋯" for the rest (the "⋯" opens the
  remaining items; theme toggle can live there too). Owner may revisit later.

### Hero (approved in mockups v4 / variant 2)

Takes full viewport height on common resolutions. Photo on the right (current
`hp-hero.png`), text on the left. Text is smaller than today and rewritten; the
"zobrazit služby" button is removed. Social icons move out of the hero (footer
and contact section). *(builder's call, recorded)*

Entrance sequence (desktop and mobile):

1. Photo fades in with a slight scale-up (starts ~0.15 s, 0.7 s).
2. Eyebrow ("Petra Konrádová · fitness trenérka") and H1 reveal **word by
   word**: 80 ms between words, each word 0.5 s — fade + rise ~0.4 em + un-blur.
3. Paragraph appears **as a whole** right after the H1.
4. Then, together: the right-side nav **as a whole** (single fade/slide, not
   item by item), the logo/toggle, and a down-arrow button at the bottom center
   that gently bobs (loops). The arrow is a link to `#sluzby`.

Total ≈ 2 s. The photo (LCP element) is fully visible within ~1 s; all text is
server-rendered HTML regardless of animation. With `prefers-reduced-motion`,
everything is shown immediately and the arrow doesn't bob.

Mobile hero layout is not mocked yet — designed in the impeccable pass.

Reference mockup: `.superpowers/brainstorm/*/content/hero-v4.html` (local,
git-ignored).

### Homepage sections (in order)

Calm, consistent rhythm across sections; content fades in gently once when
scrolled into view (respecting reduced motion). Each section's look is designed
with impeccable and **shown to the owner for approval** before moving on.

1. **Hero** — above.
2. **Služby** (`#sluzby`) — 6 services as a grid on all breakpoints (no
   carousel on mobile anymore). Followed by the existing call-to-action block
   ("Máte specifický problém…" + phone + link to contact form).
3. **Galerie** — existing gallery images.
4. **Kurzy** (`#kurzy`) — two subsections:
   - *Nadcházející* — upcoming, sorted soonest first.
   - *Proběhlé* — past, most recent first; show 3, "zobrazit starší" expands
     the rest inline.
   - Empty state when nothing is upcoming: a short line linking to contact
     (e.g. "Další termín připravuji — napište si o něj."). Exact copy: owner.
   - Course data gets structured dates (`startDate`, optional `endDate`, ISO)
     instead of the free-text `date`, for sorting, display and JSON-LD.
   - Upcoming/past split must stay correct without a redeploy: homepage uses
     time-based revalidation (e.g. daily). *(builder's call, recorded)*
   - The existing "zobrazit všechny kurzy" button to the trainer's profile on
     cklenka.cz stays (it's the path to more dates, especially when nothing is
     upcoming). *(builder's call, recorded)*
   - Past course cards keep their link, as today (owner's decision).
   - `Event` JSON-LD only for upcoming courses — search engines only use it
     for events that haven't happened yet. *(builder's call, recorded)*
   - At the time of writing all 5 courses in the data are past, so the section
     will launch in its empty state unless the owner adds new dates.
5. **O mně** (`#o-mne`) — existing story content.
6. **Semináře** (`#seminare`) — existing list of completed seminars.
7. **Reference** (`#reference`) — no carousel. Show 3; a "zobrazit všechny
   reference" button expands the rest inline. All reference text is in the
   HTML (good for SEO/AEO). Button has proper `aria-expanded`.
8. **Blog teaser** — text along the lines of "Zaujalo Vás něco a zajímá Vás
   více můj pohled na cvičení a zdravý životní styl? Kontaktujte mne nebo
   navštivte můj blog…", previews of the latest 3–4 posts (title + excerpt,
   whole card links to the post), and a button to `/blog`. With no posts: only
   the text and button.
9. **Kontakt** (`#kontakt`) — contact form + phone, email, socials.
10. **Footer** — name, IČ 07044143, phone, email, socials, GDPR link.

### Blog

- Routes: `/blog` (list, newest first) and `/blog/[slug]` (article).
- Data layer: one module (e.g. `src/lib/blog.ts`) exposing `getPosts()` and
  `getPost(slug)` with a typed `Post` (`slug`, `title`, `excerpt`,
  `publishedAt`, optional `updatedAt`, optional `coverImage`, `body`). It
  returns mock posts now; the CMS integration later replaces only this module.
- **The CMS (Craft) delivers the article body as HTML.** `body` is an HTML
  string, sanitized server-side before rendering (allow-list of tags and
  attributes) — defense in depth even though the CMS is our own. Article
  typography is styled for arbitrary CMS HTML (headings, lists, links, images,
  quotes).
- Images come from `https://main-craft.cms-craft.com/` → allowed in
  `images.remotePatterns`; `coverImage` is a remote URL (with width/height or
  aspect ratio) rendered via `next/image`. Mock posts use the same shape.
- **Launch is blocked on the CMS integration** (owner's decision): the new
  site goes live only once the blog has real content. Mock posts are for
  development only and must never reach production.
- `generateStaticParams` + time-based revalidation; unknown slug → 404.
- Article pages: own metadata, canonical URL, OG tags, `BlogPosting` JSON-LD.

### Contact form

- Fields as today: full name, email, phone (optional), note; Turnstile widget.
- Built with shadcn form components + react-hook-form + zod; submitted through
  a **Server Action**, with pending/success/error states.
- Without JavaScript the form cannot pass (Turnstile needs JS to issue a
  token). Bot protection wins: the server never skips verification, and a
  `<noscript>` note offers phone and email instead. *(builder's call, recorded)*
- **Security** (a Server Action is a public endpoint like any API):
  - Re-validate everything server-side with the same zod schema, including
    length limits.
  - Verify the Turnstile token server-side before doing anything else; failure
    returns a user-facing error, not a 500.
  - **Escape all user input** before putting it into the HTML email (today's
    API route interpolates raw input — HTML injection into the owner's inbox).
  - `replyTo` = validated email only; generic error messages to the client,
    details only in server logs.
- The GDPR consent/link stays as it is today.

### SEO / AEO

- Metadata API: title template, description, canonical URLs, Open Graph +
  Twitter cards (existing `og-image.png` as default), `lang="cs"`, icons.
- `app/sitemap.ts` (home, GDPR, blog, every post) and `app/robots.ts`.
- JSON-LD: `Person` + `ProfessionalService` for Petra/PK-Fit (no address unless
  the owner supplies one), `Event` per course, `BlogPosting` per article.
  References are **not** marked up as `Review` (self-serving reviews aren't
  eligible and risk a manual action). *(builder's call, recorded)*
- Semantic HTML: one `h1` per page, logical heading order, landmarks, real
  links/buttons, descriptive `alt` text.
- Server-render everything possible; client components only where interaction
  or animation needs them.

### Accessibility

- WCAG 2.2 AA: contrast in both themes, visible focus, keyboard access to nav,
  theme toggle, expanders and form; skip link to main content; form errors
  announced and tied to fields; `prefers-reduced-motion` honored everywhere.

### Other pages

- `/zasady-zpracovani-osobnich-udaju-gdpr` — same URL and content, new styling.
- 404 — `not-found.tsx`, same message, new styling.

### Testing & quality bar

- Unit tests (Vitest): course upcoming/past split and sorting, contact form
  schema, HTML escaping of email content.
- E2E (Playwright): smoke test of `/`, `/blog`, a post, GDPR, 404, plus an
  automated accessibility check (axe) on each; contact form submission using
  Cloudflare's Turnstile test keys with mail sending stubbed.
- Targets: Lighthouse (mobile) Performance ≥ 90, Accessibility, Best Practices
  and SEO = 100 on `/` and a blog post.

### CLAUDE.md

Written as the first step of implementation, describing the target stack,
commands (pnpm), content language rules, where content data lives, and the
blog data-layer seam.

## Process notes for the builder

- Work on a feature branch; `master` stays live. The branch is merged after
  the (separate) CMS integration lands, so the blog launches with real posts.
- Order: scaffold & tooling → CLAUDE.md → theme tokens & layout shell (header,
  nav, theme toggle, footer) → hero → sections one by one → blog → contact form
  → SEO/AEO → tests & Lighthouse pass.
- Each section's visual design goes through impeccable and is approved by the
  owner before the next one starts.

## Open items (owner)

- New, shorter hero copy (until then, use the mockup copy as a placeholder).
- Exact copy for the courses empty state and the blog teaser (the text above is
  the owner's draft).

## Left to the builder

- Component structure, file layout, and naming.
- Exact Motion implementation of the agreed timings.
- Mobile hero layout and all section layouts (via impeccable, owner approves).
- Mock blog content.
