---
name: PK-FIT
description: Calm, ruled reference-sheet site for a pain-free-movement trainer, warmed by real photographs.
colors:
  mint-ground: "#e7f1f1"
  ink: "#0e1414"
  surface: "#f6fafa"
  paper: "#f6fafa"
  deep-teal: "#107974"
  deep-teal-ink: "#0c6964"
  bright-mint: "#72d7d1"
  slate-muted: "#3f4d4d"
  secondary-mist: "#dbeaea"
  field-white: "#ffffff"
  field-stroke: "#6b7c7c"
  placeholder: "#5c6d6d"
  error-red: "#b42318"
  night-ground: "#0c1212"
  night-ink: "#e8f0f0"
  night-surface: "#152121"
  night-muted: "#a3baba"
  night-mint-hover: "#9be3df"
  night-field-stroke: "#5e7676"
  night-error: "#ff8a80"
typography:
  display:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
  hand:
    fontFamily: "Caveat, cursive"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  paper: "0.25rem"
  sm: "0.5rem"
  field: "0.625rem"
  lg: "0.875rem"
  pill: "9999px"
spacing:
  base: "4px"
  item: "16px"
  block: "32px"
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)"
  section: "clamp(4rem, 2.5rem + 6vw, 7.5rem)"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.deep-teal-ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  input:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 14px"
    height: "44px"
  form-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "28px"
  cta-band:
    backgroundColor: "{colors.deep-teal}"
    textColor: "{colors.surface}"
    padding: "80px 40px"
  polaroid:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "10px 10px 14px"
  paper-note:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.paper}"
    padding: "24px 24px 20px"
---

# Design System: PK-FIT

## Overview

**Creative North Star: "The Calm Reference Sheet"**

The site reads like a well-set reference sheet that a patient expert hands you: ruled sections, numbered entries, exact facts (DNS, diagnostics, seminar list), and real photographs of Petra at work. Competence is shown through specifics, never through intensity. Everything that could feel like a gym poster (dark drama, neon, sweat, shouting type) is absent on purpose; the audience arrives in pain or unsure whether to start, and the page lowers that fear.

Density is relaxed: one idea per section, generous vertical rhythm, a narrow reading measure. Components are calm and welcoming: flat surfaces, hairline rules, rounded pill actions, nothing that competes with the photographs. The only physical objects in the world are paper ones, a taped note and white polaroid prints, and they live in the courses section alone.

Light and dark are equal citizens. Dark mode keeps the same structure on a night-teal ground; the paper objects stay light because they are prints, not UI.

**Key Characteristics:**
- Mint ground, ink text, deep teal for actions; bright mint reserved for "now".
- Hairline rules and one heavier ink rule anchoring each section's content.
- Numbered lists with tabular numerals instead of icon-card grids.
- Real photos in softly rounded frames; no illustrations standing in for the subject.
- Poppins throughout; Caveat handwriting only on paper objects and the story signature.
- Motion is an accent: one authored hero entrance, then quiet one-time fades.

## Colors

A restrained mint-and-ink palette with a single deep-teal accent; one saturated band per page at most.

### Primary
- **Deep Teal** (`deep-teal`): fills of primary buttons, the contact CTA band, focus rings and links in light mode. 4.55:1 on the mint ground, so it is used for fills and larger text.
- **Deep Teal Ink** (`deep-teal-ink`): small teal text — list numerals, inline links, paper-note links (5.7:1 on mint, 6.2:1 on paper). Also the hover state of primary buttons.
- **Bright Mint** (`bright-mint`): selection, the courses tape, active/"now" accents. On light grounds it is decorative only (1.5:1) and never carries text. In dark mode it becomes the primary action colour (11.1:1 on the night ground).

### Neutral
- **Mint Ground** (`mint-ground`): the page background in light mode.
- **Ink** (`ink`): headings, body emphasis, the heavy section rule (16.2:1).
- **Slate Muted** (`slate-muted`): paragraphs, captions, secondary text (7.7:1).
- **Surface / Paper** (`surface`, `paper`): form panel, mobile menu, polaroids and the courses note.
- **Secondary Mist** (`secondary-mist`): pressed/expanded backgrounds (e.g. the "⋯" button when open).
- **Field White / Field Stroke / Placeholder** (`field-white`, `field-stroke`, `placeholder`): form inputs; stroke ≥3:1, placeholder 5.4:1.
- **Error Red** (`error-red`): field errors and form alerts (5.7:1).
- **Night Ground / Night Ink / Night Surface / Night Muted** (`night-*`): the dark theme's equivalents (ink 16.3:1, muted 9.3:1).

### Named Rules
**The Now Rule.** Bright mint marks what is current or interactive-in-progress (active nav weight aside, selection, tape, dark-mode actions); it never becomes a large decorative field in light mode.

**The One Band Rule.** A page carries at most one full-width colour field. On the homepage it is the contact CTA, because contact is the site's main goal.

**The Paper Stays Paper Rule.** Polaroids and the taped note keep the light paper colour and dark ink in both themes; links on paper use Deep Teal Ink, never the theme's primary.

## Typography

**Display Font:** Poppins (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Poppins
**Hand Font:** Caveat (with cursive), self-hosted via next/font

**Character:** One friendly geometric sans carries everything, from the bold hero to small captions; a single handwritten face adds the human touch on physical objects only.

### Hierarchy
- **Display** (700, fluid 40–60px, 1.1): the hero H1 and the 404 heading; one per page.
- **Headline** (600, fluid 28–40px, 1.15): section headings (Služby, Kurzy, Reference…), article titles.
- **Title** (600, fluid 18–20px, 1.35): list entries, sub-sections (Nadcházející, Proběhlé), card titles.
- **Body** (400, fluid 16–18px, 1.6): paragraphs; measure capped at 60–65ch. 17px rather than 16px because the audience includes older adults.
- **Label** (400, 13–15px): navigation, dates, captions, keyword lines; tabular numerals for dates and numbers.
- **Hand** (Caveat 700, 22–32px): the courses note title, polaroid captions, the story signature.

### Named Rules
**The Hand Is Paper Rule.** Caveat appears only on paper objects and the signature. It never sets a heading, a button or navigation.

## Layout

Single long page, one idea per section. Content sits in a centred column up to 72rem with a fluid side gutter (16–40px); from 1280px the gutter grows to at least 7rem so content never runs under the fixed side navigation. Sections breathe 64px (phone) to 120px (desktop) vertically, always with more space above a heading than below it. Reading pages (blog article, GDPR) narrow to 44rem.

Two-column compositions (photo + list, text + form, story photo + text) collapse to one column below 768–1024px with the photo first. Grids are used for galleries, polaroids and blog cards only; services, seminars and references are ruled lists, not card grids.

### Named Rules
**The Rule Line Rule.** Each section's content starts under a 1px ink rule; items inside are separated by 1px hairlines at 16% ink. Rules replace boxes.

## Elevation & Depth

Flat by default. Depth appears only where something is a physical object: polaroids and the paper note carry a soft drop shadow (`0 14px 24px -14px rgb(14 20 20 / 0.45)` and `0 10px 18px -10px rgb(14 20 20 / 0.35)`), and the floating mobile navigation and its menu lift slightly (`0 12px 32px -12px rgb(14 20 20 / 0.35)`). Panels such as the contact form are distinguished by tone (surface on mint), not by shadow.

### Named Rules
**The Only Objects Cast Shadows Rule.** If it is not paper or a floating control, it has no shadow.

## Shapes

Softly rounded photos and panels (lg), pill-shaped actions and nav controls, 10px fields, and nearly square paper (4px). Paper objects are rotated a degree or two (alternating −2° / +1.5°) as if placed by hand; nothing else is rotated. Hero and story photos keep their organic blob-and-chevron cut-outs from the brand imagery.

## Components

### Buttons
- **Shape:** full pill (`rounded.pill`), 44px minimum height.
- **Primary:** Deep Teal fill with surface-coloured text, semibold; hover to Deep Teal Ink. In dark mode: Bright Mint fill with night-ground text, hover Night Mint Hover.
- **Ghost:** transparent with a field-stroke border and ink text; hover darkens the border and adds a mist background. Used for "zobrazit starší" / "zobrazit všechny reference".
- **Focus:** 2px ring in the theme's ring colour, 3px offset; inside the teal CTA band the ring switches to the band's text colour.

### Inputs / Fields
- **Style:** white field (night ground in dark), 1px field-stroke border, 10px radius, 44px tall; labels above, placeholders as hints only (never pre-filled values).
- **Focus:** border and 2px outline in the ring colour.
- **Error:** red border plus 1px red inner ring, message below linked by `aria-describedby`.

### Navigation
- **Desktop (≥1280px):** a quiet vertical list fixed at the right edge under the theme toggle, 13px muted text; the current section is bold ink. No other marker.
- **Mobile/tablet:** a floating pill at the bottom with four items (služby, kurzy, blog, kontakt) and a "⋯" button opening the rest plus the theme toggle; it hides while scrolling down and returns on scroll up.

### Polaroid (signature)
White print with a 4:3 photo, Caveat title, date and place in label type beneath; rotated alternately. Past courses link out from the whole print.

### Paper Note (signature)
Light paper slip with a strip of bright-mint tape, Caveat headline and one body line with a Deep Teal Ink link; used for the "next date coming" empty state.

### Contact CTA Band
The page's one full-width colour field: headline left, sentence with the phone number (enlarged) and form link right.

## Do's and Don'ts

### Do:
- **Do** show real photographs of Petra and real training; use the course's own photo for a course.
- **Do** structure content as ruled, numbered lists with tabular numerals before reaching for cards.
- **Do** keep every text/background pair at WCAG AA in both themes; check new colours against the mint and night grounds.
- **Do** keep motion to the hero entrance plus quiet one-time fades, and honour `prefers-reduced-motion` and no-JS.
- **Do** keep blog/GDPR pages free of Motion and form code.

### Don't:
- **Don't** use dark, intense "gym" imagery, neon accents or aggressive type — the audience is people in pain or just starting.
- **Don't** replace photos with illustrated body diagrams or pictograms (rejected by the owner).
- **Don't** hide content in carousels.
- **Don't** use Caveat outside paper objects and the signature.
- **Don't** put bright mint text on light grounds.
