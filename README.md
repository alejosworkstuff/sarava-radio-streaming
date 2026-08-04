# Saravá — Espacio Cultural Saravá

[![local CI](https://img.shields.io/badge/local%20CI-passing-brightgreen?logo=github-actions&logoColor=white)](.github/workflows/ci.yml) [![Vercel](https://img.shields.io/badge/live-Vercel-000000?logo=vercel&logoColor=white)](https://sarava-radio-streaming.vercel.app)

A Next.js site for **Espacio Cultural Saravá**, a community cultural space in San Carlos de Bolívar, Buenos Aires, Argentina. Radio streaming, podcast, book club, cultural posts, team info — plus a **Clerk-gated admin CMS** backed by **Neon Postgres** and **Vercel Blob**.

**Live:** [sarava-radio-streaming.vercel.app](https://sarava-radio-streaming.vercel.app)  
**Repo:** [github.com/alejosworkstuff/sarava-radio-streaming](https://github.com/alejosworkstuff/sarava-radio-streaming)

## Screenshots

| Home | Radio | Club de lectura | Espacio cultural |
|:---:|:---:|:---:|:---:|
| ![Home](./assets/screenshots/main.webp) | ![Radio](./assets/screenshots/radio.webp) | ![Club de lectura](./assets/screenshots/club-de-lectura.webp) | ![Espacio cultural](./assets/screenshots/espacio-cultural.webp) |

---

## Problem and Context

The collective needed a maintainable public site (radio, podcast, reading club, events) and a way to publish without touching Git. The site runs on Vercel with a shared-admin CMS so editors can manage content, images, and branding from `/admin`.

## My Role

- Built the Next.js App Router public site (originally static export for GitHub Pages)
- Migrated production to **Vercel** (server-ready)
- Shipped admin CMS: **Clerk** auth, **Neon + Prisma**, **Vercel Blob** uploads, CRUD for posts / events / novels / about
- Reader comments (posts, active novel, radio + podcast pages)
- Site logo from admin, featured-only adaptive hero, admin pastel palette toggle
- CI for lint, content validation, and production build

---

## Tech Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript 5**
- **Tailwind CSS 4** (+ custom CSS in `app/styles/`)
- **Clerk** — reader sign-in/up; `/admin` gated by `ADMIN_EMAIL` allowlist
- **PostgreSQL (Neon)** + **Prisma** — Post, Event, Novel, About, SiteSettings, Comment
- **Vercel Blob** — image uploads from admin
- **Vercel** — production host

---

## Site Map

| Route | Page |
|-------|------|
| `/` | Home — featured hero + highlights |
| `/radio-streaming` | Live streaming schedule + comments |
| `/podcast` | Spotify show + comments |
| `/club-lectura` | Novel of the month + comments |
| `/espacio-cultural` | Cultural posts |
| `/sobre-nosotrxs` | About + team |
| `/sign-in`, `/sign-up` | Clerk auth |
| `/admin/*` | CMS (allowlisted admins) |

---

## Architecture Overview

```text
sarava-project/
├── app/                    # App Router pages and components
│   ├── admin/              # CMS CRUD + settings + comments moderation
│   ├── components/         # site-shell, hero-banner, cultural-posts, …
│   ├── styles/             # tokens, layout, components CSS
│   └── */page.tsx          # Public section pages
├── lib/
│   ├── content.ts          # Prisma-backed loaders for the public site
│   └── generated/prisma/   # Prisma client output
├── prisma/                 # schema + migrations + seed
├── content/                # JSON seed / CI validation snapshot (not live source)
├── public/uploads/         # Legacy local media (new uploads → Blob)
├── docs/                   # Retired GH Pages export (not the live host)
└── .github/workflows/ci.yml
```

Public pages load from Neon via `lib/content.ts` (`getPosts`, `getEvents`, `getNovels`, `getAbout`, site settings). The `content/` JSON tree remains for **seed** and `npm run validate:content` — editors use `/admin`, not Git.

---

## Key Features

- Live community hub on Vercel (no static export)
- Admin CMS: posts, events, novels, about/team, site logo
- Image uploads to Vercel Blob with admin previews
- Reader comments on posts, active novel, radio, and podcast
- Featured-only adaptive home hero
- Responsive layout and Spanish UI copy throughout

---

## Local Development

```bash
npm install
cp .env.example .env.local   # Clerk, DATABASE_URL, BLOB_READ_WRITE_TOKEN, ADMIN_EMAIL
npx prisma migrate dev
npm run db:seed              # optional — load demo content from content/
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run lint` | ESLint |
| `npm run validate:content` | Zod validation for `content/` JSON snapshot |
| `npm run ci` | lint + validate + build |
| `npm run db:seed` | Seed Neon from `content/` |

### Environment

See [`.env.example`](./.env.example). Minimum:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
- `ADMIN_EMAIL` — comma-separated allowlist for `/admin`
- `DATABASE_URL` — Neon Postgres
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob (uploads)
- `NEXT_PUBLIC_SITE_URL` — canonical URL

---

## Deploy (Vercel)

Production deploys from this GitHub repo on **Vercel**. Set the env vars above for Preview + Production. Custom domain (e.g. espacioculturalsarava) is **aplazado** — no purchase yet.

The old GitHub Pages / Decap workflow is **retired**.

---

## CI

GitHub Actions (`.github/workflows/ci.yml`) on pull requests and pushes to **`main`**:

- `npm run lint`
- `npm run validate:content`
- `npm run build`

```bash
npm install
npm run ci
```

---

## Roadmap

1. ~~Vercel hosting (no static export)~~
2. ~~Clerk + `/admin` shell~~
3. ~~Neon + Prisma + seed~~
4. ~~Vercel Blob uploads~~
5. ~~CRUD panel (posts / events / novels / about)~~
6. ~~Deepen: comments, logo, adaptive hero, team editor, Spotify podcast~~
7. Custom domain — **aplazado**

## Case Study Highlights (Portfolio Use)

- **Challenge:** Multi-section cultural site that non-developers can update.
- **Approach:** Next.js App Router public site + Clerk allowlist admin + Neon/Prisma + Blob.
- **Result:** Live community hub with self-serve publishing on Vercel.
