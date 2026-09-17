# Intellimindz Foundation — Website

Website for Intellimindz Foundation, a Section 8 Company building a digitally
literate, financially aware and future-ready India through accessible learning
in financial technology and emerging digital finance.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 — design tokens live in `src/app/globals.css`
- Fonts: Plus Jakarta Sans (display) + Inter (body), via `next/font`

## Brand system

| Token | Value | Use |
|-------|-------|-----|
| `navy` | `#1b2a6b` | Wordmark, headings, primary buttons |
| `navy-ink` | `#0b1230` | Dark sections |
| `teal` | `#00b3ae` | Accent, links, CTAs on hover, rules |
| `surface` / `surface-2` | `#ffffff` / `#f4f6fb` | Page and alternating sections |

Recurring motifs: fine engineering grid (`.grid-bg`), soft brand glow
(`.glow`), sparkle mark from the logo, and 2px teal rules under headings.

## Structure

```
src/
  app/            One folder per route + layout, metadata, sitemap, robots,
                  icon.svg (favicon) and opengraph-image.tsx (social card)
  components/     Nav, Footer, Logo, Button, Marquee, Reveal, BrandFigure,
                  CourseExplorer, ContactForm, SectionLabel
  lib/content.ts  All site copy as data — domains, levels, pillars,
                  initiatives, support points
public/images/    Image slots (see below)
```

Routes: `/`, `/courses`, `/learning`, `/impact`, `/about`, `/support`,
`/partnerships`, `/insights`, `/contact`, `/privacy`, `/terms`.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Swapping in real assets

**Photography.** `public/images/` holds generated brand artwork as
placeholders: `hero.jpg`, `catalogue.jpg`, `support.jpg`, `impact.jpg`.
Drop a real photograph in with the same filename and it appears
automatically — no code change needed. Roughly 1200×900 or larger, JPG.

**Logo.** `src/components/logo.tsx` rebuilds the wordmark in live type plus a
vector mind glyph, so it stays sharp at any size and works on light and dark
backgrounds. `src/app/icon.svg` is the favicon. Replace with official brand
assets when available.

**Content to replace before launch.** The contact email in
`src/app/contact/page.tsx`, the donation link in `src/app/support/page.tsx`
(currently points at the contact page — wire to the payment gateway), the
articles in `insights` (`src/lib/content.ts`), and the legal copy in
`/privacy` and `/terms`. Each is marked with a comment in the code.

No statistics, partner names, testimonials, endorsements or accreditation
claims are asserted anywhere on the site. The national-initiative disclaimer
and the Section 80G note are rendered verbatim as supplied.
