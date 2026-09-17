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
  lib/auth/       Authentication: password hashing, sessions, tokens,
                  rate limiting, validation, server actions
  db/             Drizzle schema and the lazily-created Postgres client
  proxy.ts        Redirect gate for /account (not an auth boundary)
public/images/    Image slots (see below)
drizzle/          Generated SQL migrations
```

Public routes: `/`, `/about`, `/courses`, `/categories`, `/learning`,
`/knowledge-hub`, `/impact`, `/donate`, `/partnerships`, `/contact`,
`/privacy`, `/terms`.
Account routes: `/signup`, `/login`, `/verify-email`, `/forgot-password`,
`/reset-password`, `/account`.

## Development

```bash
cp .env.example .env.local   # then fill in DATABASE_URL and AUTH_SECRET
npm install
npm run db:migrate           # apply migrations to the database
npm run dev                  # http://localhost:3000
npm run lint
npm run test                 # unit tests for the auth primitives
npm run build
```

The marketing pages are statically rendered and need no database. Only the
account routes talk to Postgres, so the site still builds without one.

## Authentication

Accounts live in this app's own Postgres. There is no third-party identity
provider, so the security properties are ours to hold:

| Concern | How it is handled |
|---|---|
| Password storage | Argon2id, m=19 MiB t=2 p=1 (OWASP baseline), per-password salt |
| Sessions | 256-bit random token in an httpOnly, `SameSite=Lax`, Secure cookie under the `__Host-` prefix in production. Only its SHA-256 is stored, so a database leak yields no usable sessions |
| Session lifetime | 30 days, re-issued on use past the halfway mark; revoked server-side on logout and on any password change |
| Email verification | Single-use token, 24h expiry, stored hashed. Sign-in is refused until the address is confirmed |
| Password reset | Single-use token, 1h expiry, stored hashed; consuming it signs out every existing session |
| Account enumeration | Signup and reset return the same message whether or not the address exists; the inbox owner is told instead. Login failures are indistinguishable, and unknown addresses still pay the full Argon2 cost so timing does not leak |
| Brute force | Sliding-window limits per IP and per account for login, signup and reset, plus a temporary lock after repeated failures. Keys are HMAC'd, so the table holds no raw emails or IPs |
| CSRF | Server Actions only, which verify Origin against Host, backed by `SameSite=Lax` cookies |
| Transport & headers | CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, and `no-store` on every account route |
| Validation | zod at the boundary; 12–128 character passwords, common passwords and email-derived passwords rejected |

Authorisation is always re-checked server-side via `getCurrentUser()`.
`src/proxy.ts` only looks for the presence of a cookie to save a signed-out
visitor a wasted render — it is deliberately **not** the security boundary,
because the Edge runtime cannot reach the database.

Roles are `learner`, `staff` and `admin` on the user row. Staff tooling is not
built yet; anything privileged must check `user.role` on the server before
rendering or mutating.

Known gaps to close before handling donations or staff access: no MFA, no
breached-password check (HIBP k-anonymity), no session list or per-device
revocation UI, and no audit log. Housekeeping helpers exist
(`purgeExpiredSessions`, `purgeOldAttempts`) but need a scheduled job.

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
