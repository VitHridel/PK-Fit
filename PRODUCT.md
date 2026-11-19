# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** adults, typically in Prague and around, whose back or joints hurt, or who are only starting with exercise, looking for a safe, patient guide. They arrive unsure whether exercise is even right for them.
- **Secondary:** people looking for a sports weekend or a half-day workshop led by Petra (registration happens on external sites).

## Product Purpose

pk-fit.cz is the public presentation site of Petra Konrádová, a fitness trainer. Success, in order of weight:

1. The visitor contacts Petra about individual training (phone or contact form).
2. The visitor gets interested in a course and follows its external registration link.
3. The visitor opens a blog article.

## Positioning

- **Certified DNS trainer** (Dynamic Neuromuscular Stabilisation, prof. Pavel Kolář), backed by a long list of completed seminars (muscle chains, trigger points, pelvic floor, spine, nutrition…).
- **Prevention, not performance:** the goal is life without pain and joy of movement, not looks or records.
- **Human, friendly approach:** client references repeatedly describe patient explanations, motivation without pressure, and that clients are not afraid to ask anything.

## Capabilities and Constraints

- Single long homepage (hero, services, CTA, gallery, courses, story, seminars, references, blog teaser, contact), blog (`/blog`, `/blog/[slug]`), GDPR page, 404.
- Courses link out to external registration (cklenka.cz, bodymind.store); there is no booking or payment on the site.
- Blog content comes from a Craft CMS later; mock posts until then.
- Czech only (`lang="cs"`).
- Open: new shorter hero copy, courses empty-state copy and blog teaser copy are owner drafts/placeholders.

## Brand Commitments

- Name: Petra Konrádová, brand PK-FIT. Existing logo (`public/logo.svg`).
- Approved hero (mockup hero-v4, variant 2): photo right, text left, word-by-word reveal, minimal fixed right-side nav.
- Starting palette is the existing teal family (`#E7F1F1`, `#0E1414`, `#107974`, `#72D7D1`); a dark theme is new.

## Evidence on Hand

- Photos of Petra and of real training sessions: `src/assets/img/hp-hero.png`, `me.png`, `hp-gallery/*`, course photos `hp-courses/*`.
- Five real client references (`src/content/references.ts`), the seminar list (`src/content/seminars.ts`), six services, course history.
- No reviews/ratings, client counts, prices, or certifications beyond the seminar list may be invented.

## Product Principles

1. Calm confidence over intensity: the site should lower the visitor's fear of starting, never feel like an aggressive gym ("no pain no gain", sweat, dark muscle imagery).
2. Show competence through specifics (DNS, diagnostics first, the seminar list), not superlatives.
3. Contact is always one step away; courses are the second path; blog third.
4. Content is never hidden behind carousels; motion is an accent, never a gate.

## Accessibility & Inclusion

WCAG 2.2 AA in light and dark themes; `prefers-reduced-motion` honored everywhere. Audience includes people in pain and older adults: generous text size, clear contrast, large tap targets.
