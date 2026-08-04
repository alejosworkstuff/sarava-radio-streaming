# Content directory — seed + CI snapshot

JSON files in this folder are the **seed / validation snapshot** for Espacio Cultural Saravá. The **live site reads from Neon Postgres** via Prisma (`lib/content.ts`). Editors publish from `/admin`, not by editing these files.

**Live site:** [sarava-radio-streaming.vercel.app](https://sarava-radio-streaming.vercel.app)

To load this tree into the database:

```bash
npm run db:seed
```

CI still runs `npm run validate:content` against these JSON files (Zod schemas + referenced images).

---

## Overview

| Folder | Used for | Live loader (DB) |
|--------|----------|------------------|
| `posts/` | Seed cultural posts | `getPosts()` |
| `novels/` | Seed book-club novels | `getNovelOfTheMonth()`, `getNovels()` |
| `events/` | Seed radio / events | `getEvents()`, `getFeaturedEvent(category?)` |
| `about.json` | Seed about + team | `getAbout()` |

---

## Current files

| Collection | File | Notes |
|------------|------|--------|
| **posts** | `posts/encuentro-cultural-fin-de-semana.json` | Espacio Cultural |
| **posts** | `posts/taller-abierto-expresion-oral.json` | Espacio Cultural |
| **novels** | `novels/las-indignas.json` | `active: true` — novel of the month |
| **events** | `events/streaming-jueves.json` | Radio streaming |
| **about** | `about.json` | Highlights, paragraphs, team |

Schemas for local validation live in `lib/content-schemas.ts`. See the root [README](../README.md) for stack, admin setup, and deploy notes.
