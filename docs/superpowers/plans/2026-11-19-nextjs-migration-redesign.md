# PK-Fit Next.js Migration & Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild pk-fit.cz on Next.js 16 App Router + Tailwind 4 + shadcn/ui with a full redesign (light/dark), a blog on a swappable data layer, and a hardened contact form.

**Architecture:** Fresh scaffold on branch `feat/next16-redesign`. The old `src/` is parked in `legacy/` as read-only reference while porting and deleted at the end. Content stays as typed modules in `src/content/`; logic that can be tested lives in `src/lib/`; sections are server components with small client islands (nav, theme toggle, expanders, contact form, scroll reveal). The hero entrance is pure CSS so it starts at first paint; scroll reveals use Motion.

**Tech Stack:** Next.js 16 (Turbopack), React 19, TypeScript strict, Tailwind CSS 4, shadcn/ui, motion, next-themes, react-hook-form + zod, nodemailer, sanitize-html, Vitest + Testing Library, Playwright + @axe-core/playwright, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-19-nextjs-migration-redesign-design.md`

## Global Constraints

- Package manager: **pnpm**. Delete `yarn.lock`. No MUI, Emotion, Formik, yup, axios, `@fontsource` anywhere.
- Next.js `^16`, React `^19`, Tailwind `^4`, TypeScript strict. Hosting: Node server via `next start`.
- Code, comments, commits, docs in English. Site content in Czech, `<html lang="cs">`.
- Code style: 4-space indent, single quotes, no semicolons (Prettier).
- URLs that must keep working: `/`, `/#sluzby`, `/#kurzy`, `/#o-mne`, `/#seminare`, `/#reference`, `/#kontakt`, `/zasady-zpracovani-osobnich-udaju-gdpr`.
- Env vars (names unchanged): `NEXT_PUBLIC_TURNSTILE_SITEKEY`, `TURNSTILE_SECRETKEY`, `SMTP_HOST`, `SMTP_SENDER`, `NEXT_PUBLIC_IG`, `NEXT_PUBLIC_FB`. New: `BLOG_SOURCE` (only `mock` exists for now), `MAIL_TRANSPORT` (`json` = don't send, for tests).
- SMTP: host from env, port 25, `secure: false`, `ignoreTLS: true` (the owner's infra — do not change).
- Remote images allowed only from `https://main-craft.cms-craft.com/`.
- WCAG 2.2 AA in both themes; `prefers-reduced-motion` honored everywhere.
- Every section's visual design goes through the **impeccable** skill and is **approved by the owner** before the next section starts (marked **CHECKPOINT** below — stop and wait).
- Mock blog posts must never reach production; the branch merges only after the separate CMS integration.
- Lighthouse (mobile) on `/` and a blog post: Performance ≥ 90; Accessibility, Best Practices, SEO = 100.

## Review Focus

1. **Course ending today / ongoing multi-day course, server in UTC** — a course stays in "Nadcházející" until the end of its last day in Europe/Prague time, regardless of server timezone. (Task 2 test)
2. **Contact note containing HTML, very long text or newlines** — HTML arrives escaped in the owner's email, newlines become `<br>`, over-limit input gets a Czech field error instead of a crash. (Task 9 tests)
3. **CMS HTML with `<script>`, `on*` handlers, `javascript:` links, `<iframe>`, `style`** — all stripped; headings, lists, links, images and quotes survive; external links get `rel="noopener noreferrer"`. (Task 8 test)
4. **Turnstile script blocked (ad blocker) or token expired** — submit shows a clear Czech message with phone and email; server never sends mail without a verified token. (Tasks 9 and 10 tests)
5. **JavaScript disabled** — all content is visible (scroll-reveal hidden state is overridden), hero text is readable, the form shows the noscript contact note. (Task 5 test)

---

## File Structure

```
next.config.ts                 svgr via Turbopack rules, images.remotePatterns
postcss.config.mjs             @tailwindcss/postcss
vitest.config.ts, playwright.config.ts, .prettierrc, eslint.config.mjs, components.json
CLAUDE.md, README.md, .env.template
legacy/                        old src/, read-only reference (deleted in Task 12)
src/app/
  layout.tsx                   html/body, fonts, ThemeProvider, MotionConfig, shell, noscript style
  globals.css                  Tailwind 4 @theme tokens, light + .dark, base styles, hero keyframes
  page.tsx                     homepage (revalidate = 86400)
  not-found.tsx
  zasady-zpracovani-osobnich-udaju-gdpr/page.tsx
  blog/page.tsx, blog/[slug]/page.tsx
  sitemap.ts, robots.ts
src/components/
  ui/                          shadcn primitives (button, input, textarea, label, field…)
  layout/  SiteHeader.tsx  SideNav.tsx  MobileNav.tsx  Footer.tsx  SkipLink.tsx  useActiveSection.ts
  theme/   ThemeProvider.tsx  ThemeToggle.tsx
  motion/  Reveal.tsx  WordReveal.tsx
  ShowMore.tsx                 shared inline expander (courses, references)
  JsonLd.tsx
  sections/ Hero.tsx Services.tsx ContactCta.tsx Gallery.tsx Courses.tsx Story.tsx Seminars.tsx References.tsx BlogTeaser.tsx Contact.tsx
  contact/  ContactForm.tsx  Turnstile.tsx
  blog/     PostCard.tsx  ArticleBody.tsx
src/content/   site.ts nav.ts services.tsx courses.ts references.ts seminars.ts gallery.ts gdpr.ts blog-mock.ts
src/lib/       courses.ts blog.ts sanitize.ts jsonld.ts
src/lib/contact/ schema.ts email.ts turnstile.ts handle.ts action.ts mailer.ts
src/assets/    images + svg icons (moved from legacy)
tests/unit/    *.test.ts(x)   (Vitest)
tests/e2e/     *.spec.ts      (Playwright, runs against `next build && next start`)
```

---

### Task 1: Scaffold, tooling, CLAUDE.md

**Files:**
- Move: `src/` → `legacy/src/`, `next.config.js` → delete (replaced)
- Create: `next.config.ts`, `postcss.config.mjs`, `tsconfig.json` (rewrite), `eslint.config.mjs`, `.prettierrc`, `vitest.config.ts`, `playwright.config.ts`, `src/app/layout.tsx` (minimal), `src/app/page.tsx` (placeholder), `src/app/globals.css` (Tailwind import only), `tests/unit/smoke.test.ts`, `tests/e2e/smoke.spec.ts`, `CLAUDE.md`
- Modify: `package.json`, `.gitignore`, `.env.template`, `README.md`
- Delete: `yarn.lock`, `.eslintrc.json`

**Interfaces:**
- Produces: scripts `dev`, `build`, `start`, `lint`, `format`, `test` (vitest run), `test:e2e` (playwright); path alias `@/*` → `src/*`; Playwright `webServer` = `pnpm build && pnpm start -p 3100` with env `BLOG_SOURCE=mock`, `MAIL_TRANSPORT=json`, `NEXT_PUBLIC_TURNSTILE_SITEKEY=1x00000000000000000000AA`, `TURNSTILE_SECRETKEY=1x0000000000000000000000000000000AA`, `SMTP_SENDER=test@pk-fit.cz`, `NEXT_PUBLIC_IG=https://instagram.com/test`, `NEXT_PUBLIC_FB=https://facebook.com/test`; Playwright projects `desktop` (1440×900) and `mobile` (390×844).

- [ ] **Step 1:** `git mv src legacy/src`; exclude `legacy/` in tsconfig, ESLint, Vitest and Prettier ignore.
- [ ] **Step 2:** Rewrite `package.json` deps with pnpm: `next@^16 react@^19 react-dom@^19 tailwindcss@^4 @tailwindcss/postcss motion next-themes react-hook-form zod @hookform/resolvers nodemailer sanitize-html sharp`; dev: `typescript @types/node @types/react @types/react-dom @types/nodemailer @types/sanitize-html eslint eslint-config-next prettier vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @playwright/test @axe-core/playwright @svgr/webpack`. Run `pnpm install`, delete `yarn.lock`.
- [ ] **Step 3:** `next.config.ts`: `turbopack.rules['*.svg'] = { loaders: ['@svgr/webpack'], as: '*.js' }`, `images.remotePatterns = [{ protocol: 'https', hostname: 'main-craft.cms-craft.com' }]`, `reactStrictMode: true`.
- [ ] **Step 4:** Minimal `layout.tsx` (`<html lang="cs">`) and `page.tsx` rendering `<h1>PK-FIT</h1>`; `tests/unit/smoke.test.ts` (`expect(1).toBe(1)`), `tests/e2e/smoke.spec.ts` (GET `/` → 200, `h1` visible).
- [ ] **Step 5:** Run `pnpm lint && pnpm test && pnpm test:e2e`. Expected: all pass, `pnpm build` succeeds.
- [ ] **Step 6:** Run `pnpm dlx shadcn@latest init` (Tailwind v4, CSS variables, `src/components/ui`). Keep `components.json`.
- [ ] **Step 7:** Write `CLAUDE.md`: stack, pnpm commands, content in Czech / code in English, code style, where content lives (`src/content`), blog seam (`src/lib/blog.ts` — the only file the CMS integration replaces), `BLOG_SOURCE`/`MAIL_TRANSPORT`, CHECKPOINT rule for design, legacy folder is reference only. Update `README.md` (setup, env, scripts) and `.env.template` (add `BLOG_SOURCE`, `MAIL_TRANSPORT` with comments). Add `.next`, `test-results`, `playwright-report` to `.gitignore`.
- [ ] **Step 8: Commit** — `chore: scaffold Next 16 app router with pnpm, Tailwind 4, shadcn, test tooling`

---

### Task 2: Content modules and course logic

**Files:**
- Create: `src/content/{site,nav,services,courses,references,seminars,gallery,gdpr}.ts(x)`, `src/lib/courses.ts`, `tests/unit/courses.test.ts`
- Move: images/icons from `legacy/src/assets` → `src/assets`

**Interfaces:**
- Produces:
  - `site`: `{ name: 'Petra Konrádová', brand: 'PK-FIT', url: 'https://pk-fit.cz', phone: '+420 720 458 858', phoneHref: 'tel:+420720458858', email: 'info@pk-fit.cz', ico: '07044143', socials: { instagram?: string, facebook?: string } }` (socials from `NEXT_PUBLIC_IG` / `NEXT_PUBLIC_FB`)
  - `navItems: { label: string, href: string, sectionId?: string }[]` = služby `/#sluzby`, kurzy `/#kurzy`, o mně `/#o-mne`, semináře `/#seminare`, reference `/#reference`, blog `/blog`, kontakt `/#kontakt` (in this order); `mobilePrimaryNav` = služby, kurzy, o mně, kontakt
  - `type Course = { id: string, title: string, place: string, startDate: string /* YYYY-MM-DD */, endDate?: string, description: string, link: string, image: StaticImageData }`
  - `type Service = { id: string, title: string, text: string, Icon: ComponentType<SVGProps<SVGSVGElement>> }`
  - `type Reference = { name: string, text: string }`
  - `type Seminar = { title: string, provider: string, url?: string }` (converted from legacy ReactNode links; "Khora Movement School" has no url)
  - `splitCourses(courses: Course[], now: Date): { upcoming: Course[], past: Course[] }`
  - `formatCourseDate(course: Course): string`

- [ ] **Step 1: Write failing tests** in `tests/unit/courses.test.ts`:
  - `splitCourses` puts a course with `endDate` before today in `past`, one starting after today in `upcoming`.
  - `upcoming` sorted by `startDate` ascending; `past` sorted by `endDate ?? startDate` descending.
  - Ongoing multi-day course (`startDate: '2026-11-18'`, `endDate: '2026-11-20'`, now `2026-11-19T10:00:00Z`) → upcoming.
  - Single-day course on its day: `startDate: '2026-11-19'`, now `2026-11-19T22:30:00Z` (= 23:30 Prague) → upcoming; now `2026-11-19T23:30:00Z` (= 00:30 Prague on the 20th) → past.
  - `formatCourseDate({ startDate: '2025-09-21' })` → `'21. 9. 2025'`; `{ startDate: '2026-02-06', endDate: '2026-02-08' }` → `'6.–8. 2. 2026'`; `{ startDate: '2026-01-30', endDate: '2026-02-01' }` → `'30. 1.–1. 2. 2026'`.
- [ ] **Step 2:** Run `pnpm test courses` → FAIL (module missing).
- [ ] **Step 3:** Implement `src/lib/courses.ts`. "Today" = calendar date of `now` in `Europe/Prague` (via `Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague' })`); a course is upcoming iff `(endDate ?? startDate) >= today` as ISO string comparison.
- [ ] **Step 4:** Port all content from `legacy/src/utils/Home/*`, legacy hero/story/footer/GDPR copy into `src/content/*` verbatim (courses: convert `date` strings to ISO `startDate`/`endDate`). Story copy keeps its emphasis as data the section can render (e.g. array of paragraphs with `strong` segments).
- [ ] **Step 5:** Run `pnpm test` → PASS; `pnpm lint` clean.
- [ ] **Step 6: Commit** — `feat: port content to typed modules, add course split and date formatting`

---

### Task 3: Design foundation, theming, root layout

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/components/theme/ThemeProvider.tsx`, `src/components/theme/ThemeToggle.tsx`, `src/components/layout/SkipLink.tsx`, `tests/e2e/theme.spec.ts`

**Interfaces:**
- Produces: semantic Tailwind tokens usable as utilities — `bg-background text-foreground text-muted-foreground bg-primary text-primary border-border` (+ shadcn's set), defined for `:root` and `.dark`; `<ThemeToggle />` (button, `aria-label` "Přepnout na tmavý režim" / "Přepnout na světlý režim"); `<main id="obsah">` in layout; skip link "Přeskočit na obsah" → `#obsah`.

- [ ] **Step 1: CHECKPOINT — design direction.** Run the impeccable skill with: brand = fitness trainer focused on pain-free movement, audience = adults with pain or starting out, the approved hero (spec § Hero; mockup `.superpowers/brainstorm/*/content/hero-v4.html`), light start palette `#E7F1F1 / #0E1414 / #107974 / #72D7D1`, dark ≈ `#0C1212 / #E8F0F0 / #72D7D1`. Output: final token values for both themes (AA contrast verified, incl. `#107974` on `#E7F1F1`), typeface decision (Poppins via `next/font` unless changed), type scale, spacing rhythm. Present to the owner; **wait for approval.**
- [ ] **Step 2: Write failing e2e** `tests/e2e/theme.spec.ts`:
  - with `colorScheme: 'dark'` and empty storage, `html` already has class `dark` at `domcontentloaded` (set by next-themes' blocking script, i.e. no flash), and `body` background equals the dark token.
  - clicking the toggle switches `html` class and persists after reload.
  - Tab from page top focuses the skip link first; activating it moves focus to `#obsah`.
- [ ] **Step 3:** Run `pnpm test:e2e theme` → FAIL.
- [ ] **Step 4:** Implement tokens in `globals.css` (`@custom-variant dark (&:where(.dark, .dark *))`), `ThemeProvider` (next-themes: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`), `ThemeToggle`, fonts via `next/font`, layout with `suppressHydrationWarning` on `<html>`, `<SkipLink />`, `<main id="obsah">`, root `metadata` with `metadataBase: new URL(site.url)` and title template `'%s | PK-FIT'`.
- [ ] **Step 5:** Run `pnpm test:e2e theme` → PASS.
- [ ] **Step 6: Commit** — `feat: design tokens, light/dark theming, root layout`

---

### Task 4: Layout shell — header, side nav, mobile nav, footer

**Files:**
- Create: `src/components/layout/{SiteHeader,SideNav,MobileNav,Footer,useActiveSection}.tsx`, `tests/e2e/nav.spec.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `navItems`, `mobilePrimaryNav`, `site` (Task 2); `ThemeToggle` (Task 3)
- Produces: `useActiveSection(sectionIds: string[]): string | null`; nav links mark the active item with `aria-current="location"` (styled bold only); `SideNav` and `MobileNav` render inside `<nav aria-label="Hlavní navigace">`; elements carry `data-hero-late` so the hero can animate them in (Task 5).

- [ ] **Step 1: Write failing e2e** `tests/e2e/nav.spec.ts` (use a temporary homepage with tall placeholder `<section id=…>` blocks for every nav section id — Task 5+ replace them):
  - desktop: side nav visible and `position: fixed`; after `#kurzy` scrolls into view, link "kurzy" has `aria-current="location"` and no other link does.
  - desktop: on `/blog` (placeholder page) the "blog" link is current; clicking "kurzy" lands on `/#kurzy` with the section in view.
  - mobile: side nav hidden; pill bar visible with služby, kurzy, o mně, kontakt and a "Další položky" button; scrolling down 600px hides the bar (translated off-screen and `inert`, so its links can't be focused); scrolling up shows it again.
  - mobile: "Další položky" opens a list with semináře, reference, blog and the theme toggle; Escape closes it and returns focus to the button.
  - footer contains `IČ: 07044143`, `tel:+420720458858`, `mailto:info@pk-fit.cz`, a link to `/zasady-zpracovani-osobnich-udaju-gdpr`, and Instagram/Facebook links (test env sets `NEXT_PUBLIC_IG`/`NEXT_PUBLIC_FB`).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. `useActiveSection` uses one `IntersectionObserver` (`rootMargin: '-40% 0px -55% 0px'`); on non-home routes active item is derived from pathname. Side nav: top-right, below the theme toggle, text 12–13 px, muted, active = bold only. Mobile bar: fixed bottom pill, hides on scroll down / shows on scroll up (threshold ~8 px, ignore while overflow menu open). Logo top-left links to `/`. Old full-width header bar and header phone button are gone.
- [ ] **Step 4:** Run `pnpm test:e2e nav` → PASS.
- [ ] **Step 5: CHECKPOINT** — impeccable polish of header/nav/footer; show owner; wait for approval.
- [ ] **Step 6: Commit** — `feat: site header, fixed side nav with scroll-spy, mobile pill nav, footer`

---

### Task 5: Hero and scroll-reveal primitive

**Files:**
- Create: `src/components/sections/Hero.tsx`, `src/components/motion/WordReveal.tsx`, `src/components/motion/Reveal.tsx`, `tests/unit/word-reveal.test.tsx`, `tests/e2e/hero.spec.ts`
- Modify: `src/app/globals.css` (hero keyframes), `src/app/layout.tsx` (`MotionConfig reducedMotion="user"`, noscript style), `src/app/page.tsx`

**Interfaces:**
- Produces:
  - `<WordReveal text: string, startIndex: number, as?: 'span' | 'div' />` — server component; renders each word as `<span class="hero-word" style="--i:N">` separated by real spaces; returns nothing client-side.
  - `<Reveal as?: keyof JSX.IntrinsicElements, delay?: number, children />` — client; Motion `initial={{ opacity: 0, y: 16 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, `duration 0.6`; renders `data-reveal` attribute.
  - Layout `<noscript><style>[data-reveal]{opacity:1!important;transform:none!important}</style></noscript>`.

Hero spec (exact values): full viewport height on common resolutions; photo right (`hp-hero.png`, `next/image` `priority`, alt "Petra Konrádová"), text left. Placeholder copy until the owner supplies new text — eyebrow `Petra Konrádová · fitness trenérka`, H1 `Zdravé tělo bez bolesti`, paragraph `Pomáhám od bolesti a učím prevenci, aby se pohyb stal radostí, ne povinností.` No "zobrazit služby" button; no social icons. Timeline (CSS only, starts at first paint):
- photo: opacity 0 → 1, scale .97 → 1, delay 0.15 s, 0.7 s, `cubic-bezier(.2,.7,.2,1)`
- eyebrow + H1 words: delay `0.55s + i × 80ms`, each 0.5 s: opacity 0 → 1, `translateY(.4em)` → 0, `blur(4px)` → 0
- paragraph (whole): starts 0.1 s after the last H1 word starts, 0.5 s, same easing
- together, 0.15 s after the paragraph starts: side nav (whole, single fade + 6 px slide), logo/toggle, down-arrow — 0.6 s fade
- arrow: link to `#sluzby`, `aria-label="Přejít na služby"`, bobs ±3 px, 1.6 s loop, starting after its fade-in
- `@media (prefers-reduced-motion: reduce)`: no animation, everything visible, no bob

- [ ] **Step 1: Write failing tests:**
  - unit: `WordReveal` with `text="Zdravé tělo bez bolesti" startIndex={5}` renders 4 spans with `--i` 5..8 and `textContent` equal to the input text.
  - e2e: raw HTML of `/` (via `request.get`) contains `Zdravé`, `bolesti` and the paragraph text.
  - e2e: with `reducedMotion: 'reduce'`, H1 words and photo have computed opacity `1` immediately after `load`.
  - e2e: with `javaScriptEnabled: false`, an element with `data-reveal` further down the page has computed opacity `1`.
  - e2e: clicking the arrow scrolls `#sluzby` into view.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `WordReveal`, `Reveal`, hero CSS keyframes, `Hero`. The late group selects `[data-hero-late]` on home only (class on `<body>` or route-scoped style) so other routes show nav immediately.
- [ ] **Step 4:** Run tests → PASS.
- [ ] **Step 5: CHECKPOINT** — impeccable for the desktop hero polish and the **mobile hero layout** (not mocked yet); show owner; wait for approval.
- [ ] **Step 6: Commit** — `feat: hero with CSS word-reveal entrance and Motion scroll reveal`

---

### Task 6: Services, contact CTA, gallery

**Files:**
- Create: `src/components/sections/{Services,ContactCta,Gallery}.tsx`, `tests/e2e/sections-top.spec.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `services`, `gallery`, `site`; `Reveal`
- Produces: `<section id="sluzby">` with `h2`; CTA copy verbatim: "Máte specifický problém nebo s cvičením teprve začínáte?" + "Zavolejte mi na číslo {phone} nebo vyplňte kontaktní formulář a můžeme se o všem nezávazně pobavit." (phone → `tel:`, "kontaktní formulář" → `#kontakt`), plus the legacy line "Zařídím, abyste mohli žít bez bolesti…".

- [ ] **Step 1: CHECKPOINT** — impeccable design of services grid, CTA block, gallery; owner approval.
- [ ] **Step 2: Write failing e2e:** all 6 service titles visible at mobile width without any swiping (no carousel); CTA has a `tel:+420720458858` link and a `#kontakt` link; gallery images have non-empty `alt`.
- [ ] **Step 3:** Run → FAIL. **Step 4:** Implement (grid on all breakpoints, `Reveal` per section). **Step 5:** Run → PASS.
- [ ] **Step 6: Commit** — `feat: services grid, contact CTA and gallery sections`

---

### Task 7: Courses, story, seminars, references (+ ShowMore)

**Files:**
- Create: `src/components/ShowMore.tsx`, `src/components/sections/{Courses,Story,Seminars,References}.tsx`, `tests/unit/courses-section.test.tsx`, `tests/unit/references.test.tsx`
- Modify: `src/app/page.tsx` (add `export const revalidate = 86400`)

**Interfaces:**
- Consumes: `splitCourses`, `formatCourseDate`, `courses`, `references`, `seminars`, story content
- Produces:
  - `<ShowMore initial: number, moreLabel: string, items: ReactNode[] />` — client; renders **all** items in HTML, items beyond `initial` get the `hidden` attribute until expanded; button with `aria-expanded` and `aria-controls`; after expanding, the button disappears and focus moves to the first newly shown item.
  - `<Courses courses: Course[], now: Date />` — server; headings "Nadcházející" and "Proběhlé"; past via `ShowMore initial={3} moreLabel="zobrazit starší"`; every card links to `course.link` (past too, `target="_blank" rel="noopener noreferrer"`); empty upcoming → "Další termín připravuji — napište si o něj." with link to `#kontakt` (copy may be replaced by owner); section ends with button "zobrazit všechny kurzy" → `https://www.cklenka.cz/instruktor/detail/konradova-petra/`.
  - `<References references: Reference[] />` — `ShowMore initial={3} moreLabel="zobrazit všechny reference"`.

- [ ] **Step 1: CHECKPOINT** — impeccable design of courses (cards, two subsections, empty state), story, seminars list, references; owner approval.
- [ ] **Step 2: Write failing unit tests (RTL):**
  - `Courses` with one future and four past courses, `now = 2026-11-19`: "Nadcházející" lists the future one; "Proběhlé" shows 3 visible + 1 `hidden`; clicking "zobrazit starší" makes all 4 visible and sets focus on the 4th.
  - `Courses` with only past courses: empty-state text and `#kontakt` link rendered.
  - `References` with 5 items: all 5 names are in `container.innerHTML`; exactly 3 are not `hidden`; button has `aria-expanded="false"` → after click, all visible.
- [ ] **Step 3:** Run → FAIL. **Step 4:** Implement; page passes `new Date()` to `Courses`. **Step 5:** Run → PASS.
- [ ] **Step 6: Commit** — `feat: courses with upcoming/past split, story, seminars, references`

---

### Task 8: Blog data layer, pages, homepage teaser

**Files:**
- Create: `src/lib/blog.ts`, `src/content/blog-mock.ts`, `src/lib/sanitize.ts`, `src/components/blog/{PostCard,ArticleBody}.tsx`, `src/components/sections/BlogTeaser.tsx`, `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `tests/unit/{blog,sanitize,blog-teaser}.test.ts(x)`, `tests/e2e/blog.spec.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces:
  - `type Post = { slug: string, title: string, excerpt: string, publishedAt: string /* ISO */, updatedAt?: string, coverImage?: { url: string, width: number, height: number, alt: string }, body: string /* HTML from CMS */ }`
  - `getPosts(): Promise<Post[]>` (newest first), `getPost(slug: string): Promise<Post | null>` — read `BLOG_SOURCE`; `mock` → `blog-mock.ts`; anything else → throw `Error('BLOG_SOURCE not configured — CMS integration required')`.
  - `sanitizeArticleHtml(html: string): string` — server-only.
  - `<BlogTeaser posts: Post[] />` — up to 4 latest.

- [ ] **Step 1: Write failing unit tests:**
  - `getPosts` with `BLOG_SOURCE=mock` returns posts sorted by `publishedAt` desc; `getPost('neexistuje')` → `null`; with `BLOG_SOURCE` unset → throws.
  - `sanitizeArticleHtml`: removes `<script>`, `<iframe>`, `<style>`, `onerror=`, `style=` attributes, `href="javascript:…"`; keeps `h2,h3,h4,p,ul,ol,li,a[href],img[src,alt,width,height],blockquote,strong,em,figure,figcaption`; `a` with an external `href` gets `rel="noopener noreferrer"` and `target="_blank"`; `img` with a `src` outside `main-craft.cms-craft.com` is removed.
  - `BlogTeaser` with 6 posts renders 4 cards (each card's whole area is one link to `/blog/{slug}`) + button to `/blog`; with `[]` renders the intro text and button, no cards. Teaser copy: "Zaujalo Vás něco a zajímá Vás více můj pohled na cvičení a zdravý životní styl? Kontaktujte mne nebo navštivte můj blog a zjistěte více jak o cvičení, zdravém životním stylu i o mně." ("Kontaktujte mne" links to `#kontakt`).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Mock: 5 Czech posts with realistic HTML bodies (headings, list, link, quote, one image on `main-craft.cms-craft.com`) — clearly fictional placeholder content. Blog pages: `generateStaticParams`, `export const revalidate = 3600`, unknown slug → `notFound()`, `/blog` empty state "Zatím tu nejsou žádné články." Article typography styled for arbitrary CMS HTML.
- [ ] **Step 4: Write e2e** `blog.spec.ts`: `/blog` lists posts; clicking one opens `/blog/{slug}` with the post `h1`; `/blog/neexistuje` returns 404.
- [ ] **Step 5:** Run unit + e2e → PASS.
- [ ] **Step 6: CHECKPOINT** — impeccable design of blog list, article page, teaser; owner approval.
- [ ] **Step 7: Commit** — `feat: blog data layer with mock source, sanitized article pages, homepage teaser`

---

### Task 9: Contact form — server side

**Files:**
- Create: `src/lib/contact/{schema,email,turnstile,mailer,handle,action}.ts`, `tests/unit/contact-{schema,email,handle}.test.ts`

**Interfaces:**
- Produces:
  - `contactSchema` (zod): `fullname` required, max 100 → "Jméno je povinný údaj"; `email` required + email, max 254 → "E-mail je povinný údaj" / "E-mailová adresa nemá správný tvar"; `phone` optional, max 30; `note` required, max 5000 → "Prosím napište něco o sobě a s čím potřebujete pomoci"; over-max messages "Text je příliš dlouhý". `type ContactInput = z.infer<typeof contactSchema>`.
  - `escapeHtml(s: string): string`; `buildContactEmail(input: ContactInput): { subject: 'Poptávka z webu', text: string, html: string }` (html escaped, newlines in note → `<br>`).
  - `verifyTurnstile(token: string | null, ip?: string): Promise<boolean>` — POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `TURNSTILE_SECRETKEY`, `fetch`, 5 s timeout; network error → `false`.
  - `sendMail(mail: { replyTo: string, subject: string, text: string, html: string }): Promise<void>` — nodemailer; `MAIL_TRANSPORT=json` → `jsonTransport: true`; else SMTP per Global Constraints; from/to `SMTP_SENDER`.
  - `type ContactState = { status: 'idle' | 'success' | 'error', message?: string, fieldErrors?: Partial<Record<keyof ContactInput, string>> }`
  - `handleContact(formData: FormData, deps: { verify: typeof verifyTurnstile, send: typeof sendMail, ip?: string }): Promise<ContactState>` — order: verify token (`cf-turnstile-response`) → validate → build → send.
  - `submitContact(prev: ContactState, formData: FormData): Promise<ContactState>` — `'use server'` wrapper wiring real deps and client IP from `headers()`.

- [ ] **Step 1: Write failing tests:**
  - schema: missing fields → the Czech messages above; `note` of 5001 chars → "Text je příliš dlouhý"; valid input passes; phone optional.
  - email: `note = '<a href="https://evil">klik</a>\nřádek 2'` → `html` contains `&lt;a href=&quot;https://evil&quot;&gt;` and `<br>`, no raw `<a`; `fullname` with `<img src=x onerror=…>` escaped likewise.
  - handle: `verify` → false ⇒ `{ status: 'error', message: 'Ověření se nepovedlo. Zkuste to prosím znovu.' }` and `send` not called; missing token ⇒ same; invalid fields with valid token ⇒ `fieldErrors`, `send` not called; valid ⇒ `send` called once with `replyTo` = email, returns `{ status: 'success' }`; `send` throws ⇒ `{ status: 'error', message: 'Něco se nepovedlo, zkuste to prosím znovu nebo mě kontaktujte na mém telefonním čísle.' }` and the error is logged server-side only.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement. **Step 4:** Run → PASS.
- [ ] **Step 5: Commit** — `feat: contact server action with zod validation, Turnstile verification, escaped email`

---

### Task 10: Contact section — UI

**Files:**
- Create: `src/components/contact/{ContactForm,Turnstile}.tsx`, `src/components/sections/Contact.tsx`, `tests/e2e/contact.spec.ts`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `contactSchema`, `submitContact`, `ContactState` (Task 9); `site`
- Produces: `<section id="kontakt">` with heading "Kontaktujte mě", subtitle "Domluvme si termín tréninku nebo si jen nezávazně popovídejme.", the form, phone, email, socials.

Form: shadcn field primitives + react-hook-form (`zodResolver(contactSchema)`) for client validation; on valid submit, call the action with `new FormData(formRef.current)` inside `startTransition` (`useActionState(submitContact, { status: 'idle' })`). Labels "Jméno a příjmení *", "Telefon", "E-mailová adresa *", "S čím potřebujete pomoci? *"; no pre-filled `+420` / `@` values (use placeholders). Turnstile: implicit widget `<div class="cf-turnstile" data-sitekey=…>` inside the form (script `https://challenges.cloudflare.com/turnstile/v0/api.js` via `next/script`, `strategy="lazyOnload"`); reset after each submit. If the script fails to load or `window.turnstile` is missing at submit → message "Ověření proti robotům se nenačetlo. Napište mi prosím na info@pk-fit.cz nebo zavolejte na +420 720 458 858." Submit button "odeslat" disabled while pending. Success → confirmation panel with "odeslat další zprávu" that resets the form. Field errors linked via `aria-describedby`, `aria-invalid`; form-level messages in `role="status"`/`role="alert"`. GDPR line: "Odesláním tohoto formuláře souhlasíte s podmínkami GDPR." linking to `/zasady-zpracovani-osobnich-udaju-gdpr`. `<noscript>`: "Formulář potřebuje zapnutý JavaScript. Napište mi na info@pk-fit.cz nebo zavolejte na +420 720 458 858."

- [ ] **Step 1: CHECKPOINT** — impeccable design of contact section and form states; owner approval.
- [ ] **Step 2: Write failing e2e:**
  - empty submit → three Czech field errors, focus on first invalid field, no request sent.
  - valid fill (Turnstile test key auto-passes) → success panel visible.
  - blocking `challenges.cloudflare.com` via `page.route` → submit shows the "Ověření proti robotům se nenačetlo…" message.
  - `javaScriptEnabled: false` → noscript note visible.
- [ ] **Step 3:** Run → FAIL. **Step 4:** Implement. **Step 5:** Run → PASS.
- [ ] **Step 6: Commit** — `feat: contact section with accessible form and Turnstile`

---

### Task 11: GDPR page, 404, SEO/AEO

**Files:**
- Create: `src/app/zasady-zpracovani-osobnich-udaju-gdpr/page.tsx`, `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/jsonld.ts`, `src/components/JsonLd.tsx`, `tests/unit/{jsonld,sitemap}.test.ts`, `tests/e2e/seo.spec.ts`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/blog/**/page.tsx` (metadata)

**Interfaces:**
- Produces: `personJsonLd(): object` (`Person` "Petra Konrádová", jobTitle "fitness trenérka", url, email, telephone, `sameAs` socials) and `professionalServiceJsonLd(): object` (`ProfessionalService` "PK-FIT", no address); `courseEventJsonLd(course: Course): object` (`Event`, `startDate`, `endDate ?? startDate`, `location: { '@type': 'Place', name: course.place }`, `url: course.link`, `eventAttendanceMode` offline, `eventStatus` scheduled); `blogPostingJsonLd(post: Post): object`; `<JsonLd data: object | object[] />` (`<script type="application/ld+json">`, `<` escaped as `<`). No `Review` markup.

- [ ] **Step 1: Write failing tests:**
  - unit: `courseEventJsonLd` maps fields as above; homepage helper emits Events only for `splitCourses(...).upcoming`.
  - unit: `JsonLd` output escapes `</script>` in data.
  - unit: `sitemap()` includes `https://pk-fit.cz/`, `/zasady-zpracovani-osobnich-udaju-gdpr`, `/blog` and every mock post URL; `robots()` allows all and points to the sitemap.
  - e2e on `/`, `/blog`, a post, GDPR: exactly one `h1`; `link[rel=canonical]` absolute; `og:title`, `og:description`, `og:image` present; every JSON-LD script parses as JSON.
  - e2e: unknown URL → 404 page with "Ups... tady nic není" and a link back to `/`.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement. Home metadata from legacy (`title` "Váš parťák na cestě za zdravým životním stylem.", description from legacy `_app.tsx`), default OG image `/og-image.png`, icons `/favicon.svg`. GDPR content ported verbatim. Post pages: title, description = excerpt, canonical, OG type `article`, cover image as OG image when present.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5: CHECKPOINT** — impeccable styling of GDPR and 404; owner approval.
- [ ] **Step 6: Commit** — `feat: GDPR and 404 pages, metadata, sitemap, robots, JSON-LD`

---

### Task 12: Quality pass and cleanup

**Files:**
- Create: `tests/e2e/a11y.spec.ts`
- Delete: `legacy/`
- Modify: `CLAUDE.md`, `README.md` as needed

- [ ] **Step 1: Write e2e** `a11y.spec.ts`: axe (`wcag2a, wcag2aa, wcag21aa, wcag22aa`) on `/`, `/blog`, a post, GDPR, 404 — in light and dark (`colorScheme`), desktop and mobile projects, after scrolling the page so all reveals have run. Expect zero violations.
- [ ] **Step 2:** Run; fix every violation in the owning component.
- [ ] **Step 3:** Run Lighthouse (mobile) against `pnpm build && pnpm start` on `/` and a post: `pnpm dlx lighthouse http://localhost:3000/ --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless"`. Expected: Performance ≥ 90, others 100. Fix regressions (image sizes, unused JS, LCP = hero photo within budget).
- [ ] **Step 4:** Verify no legacy deps remain: `grep -rE "@mui|@emotion|formik|yup|axios|fontsource" package.json src` → no matches. Delete `legacy/`. Run `pnpm lint && pnpm test && pnpm test:e2e && pnpm build` → all green.
- [ ] **Step 5:** Update `CLAUDE.md`/`README.md` to the final state.
- [ ] **Step 6: Commit** — `chore: accessibility and performance pass, remove legacy code`
