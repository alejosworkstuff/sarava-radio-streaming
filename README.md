# Saravá — Espacio Cultural Saravá

[![local CI](https://img.shields.io/badge/local%20CI-passing-brightgreen?logo=github-actions&logoColor=white)](.github/workflows/ci.yml) [![Vercel](https://img.shields.io/badge/live-Vercel-000000?logo=vercel&logoColor=white)](https://sarava-radio-streaming.vercel.app)

A Next.js site for **Espacio Cultural Saravá**, a community cultural space in San Carlos de Bolívar, Buenos Aires, Argentina. The site covers radio streaming, podcast, book club, cultural posts, and team information.

**Repo:** [github.com/alejosworkstuff/sarava-radio-streaming](https://github.com/alejosworkstuff/sarava-radio-streaming)

> **Hosting note (Jul 2026):** production moved from GitHub Pages (`docs/` static export) to **Vercel**. Content is still JSON under `content/` until the admin CMS (Clerk + Neon + Blob) ships.

## Screenshots

| Home | Radio | Club de lectura | Espacio cultural |
|:---:|:---:|:---:|:---:|
| ![Home](./assets/screenshots/main.webp) | ![Radio](./assets/screenshots/radio.webp) | ![Club de lectura](./assets/screenshots/club-de-lectura.webp) | ![Espacio cultural](./assets/screenshots/espacio-cultural.webp) |

---

## Problem and Context

The project needed a clear, maintainable web presence for a cultural community: multiple sections (radio, podcast, reading club, events), editable content, and reliable hosting. The next step is a web admin so the collective can publish without touching Git.

## My Role

- Built the Next.js App Router site (originally static export for GitHub Pages)
- Migrated production to Vercel (server-ready for Clerk + Postgres + Blob)
- Implemented file-based content loading with TypeScript types
- Designed layout, hero carousel, and section pages
- Documented JSON content schemas in `content/README.md`
- Set up CI for lint, content validation, and production build

---

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**, **TypeScript 5**
- **Tailwind CSS 4** (+ custom CSS in `app/styles/`)
- **Vercel** — production host
- **Planned:** Clerk (1 shared admin account), Neon Postgres, Vercel Blob

---

## Site Map

| Route | Page |
|-------|------|
| `/` | Home with hero carousel (book club, podcast, streaming highlights) |
| `/radio-streaming` | Live streaming schedule and links |
| `/podcast` | Podcast / YouTube channel |
| `/club-lectura` | Novel of the month and reading club |
| `/espacio-cultural` | Cultural posts (workshops, events, articles) |
| `/sobre-nosotras` | About the space and team |

Navigation and branding live in `app/components/site-shell.tsx` (`SiteHeader`, `SiteFooter`).

---

## Architecture Overview

```text
sarava-project/
├── app/                    # App Router pages and components
│   ├── components/         # site-shell, hero-banner, cultural-posts
│   ├── styles/             # tokens, layout, components CSS
│   └── */page.tsx          # Section pages
├── content/                # JSON content (posts, novels, events, about)
│   └── README.md           # Content editor guide (pre-CMS)
├── lib/content.ts          # Type-safe loaders (server-only)
├── public/
│   ├── uploads/            # Site media (migrating to Blob)
│   └── logo.jpg
├── docs/                   # Legacy GH Pages export (retired, not the live host)
├── next.config.ts
└── .github/workflows/ci.yml
```

### Content loading (`lib/content.ts`)

- `getPosts()` — Espacio Cultural posts (`content/posts/`)
- `getEvents()` / `getFeaturedEvent()` — events and transmisiones (`content/events/`)
- `getNovels()` / `getNovelOfTheMonth()` — club de lectura (`content/novels/`)
- `getAbout()` — sobre nosotras (`content/about.json`)

Content types: `PostEntry`, `EventEntry`, `NovelEntry`, `AboutContent`.

---

## Key Features

- Server-ready Next.js deploy on Vercel (no `output: "export"`)
- Hero banner carousel on the home page
- File-based JSON content (bridge until admin CMS)
- Responsive layout and custom design tokens
- Spanish UI copy throughout

---

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint |
| `npm run validate:content` | Zod validation for JSON content |
| `npm run ci` | lint + validate + build |

---

## Deploy (Vercel)

Production deploys from the GitHub repo on **Vercel**. Set `NEXT_PUBLIC_SITE_URL` to the production URL (or custom domain when ready).

The old GitHub Pages workflow (`docs/` commit on every push) is **retired**.

---

## Content editing (temporary)

Until the `/admin` panel ships, content lives in `content/posts/`, `content/novels/`, `content/events/`, and `content/about.json`. Edit in Git, push to `main`, and Vercel rebuilds.

See **`content/README.md`** for schemas.

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

## Current Content (repository snapshot)

| Collection | Files |
|------------|--------|
| `content/posts/` | 2 posts |
| `content/novels/` | 1 novel (`las-indignas.json`, active) |
| `content/events/` | 1 event (`streaming-jueves.json`) |
| `content/about.json` | About + team |

---

## Roadmap: admin CMS

1. ~~Vercel hosting (no static export)~~ — Fase 0
2. ~~Clerk — 1 shared admin account + `/admin` shell~~ — Fase 1
3. ~~Neon + Prisma — Post, Event, Novel, About + seed from JSON~~ — Fase 2
4. ~~Vercel Blob — image uploads~~ — Fase 3
5. ~~CRUD panel for Posts / Events / Novels / About~~ — Fase 4
6. Custom domain (e.g. espacioculturalsarava) — **aplazado** (sin compra aún)

## Case Study Highlights (Portfolio Use)

- **Challenge:** Multi-section cultural site with editor-friendly content.
- **Approach:** Next.js App Router + typed content loaders; migrating to Vercel + CMS so non-developers can publish.
- **Result:** Live community hub moving toward self-serve admin.
