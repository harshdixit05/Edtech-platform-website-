# IntelliMindz Foundation — Website

Marketing website for IntelliMindz Foundation, a Section 8 company building
a digitally literate, financially aware and future-ready India through
accessible FinTech education.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (CSS-based design tokens in `src/app/globals.css`)
- Fonts: Inter (body/UI) + Instrument Serif (editorial headings)

## Structure

```
src/
  app/            Route segments (one folder per page) + layout, metadata,
                  sitemap/robots
  components/     Shared UI: Nav, Footer, Button, Logo, Reveal, etc.
  lib/content.ts  Placeholder course/insight/content data — replace with
                  real content before launch (clearly marked in comments)
```

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Content placeholders

Course details, faculty, and insight articles in `src/lib/content.ts`, and
the contact email in `src/app/contact/page.tsx`, are structural placeholders
— no fabricated statistics, partners, or testimonials are included anywhere
on the site. Replace with real content before launch. The wordmark in
`src/components/logo.tsx` is a typographic placeholder pending the final
brand mark asset.
