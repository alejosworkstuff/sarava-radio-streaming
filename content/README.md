# Content directory — Espacio Cultural Saravá

JSON files in this folder power the site. Loaders live in `lib/content.ts` at the project root.

**Live site:** [alejosworkstuff.github.io/sarava-radio-streaming](https://alejosworkstuff.github.io/sarava-radio-streaming/)

---

## Overview

| Folder | Used on | Loader |
|--------|---------|--------|
| `posts/` | `/espacio-cultural`, home grid | `getPosts()` |
| `novels/` | `/club-lectura`, home hero | `getNovelOfTheMonth()`, `getNovels()` |
| `events/` | `/radio-streaming`, featured blocks | `getEvents()`, `getFeaturedEvent(category?)` |

Content is:

- Version-controlled in Git
- Loaded at build time through typed functions in `lib/content.ts`

---

## Current files

| Collection | File | Notes |
|------------|------|--------|
| **posts** | `posts/encuentro-cultural-fin-de-semana.json` | Espacio Cultural |
| **posts** | `posts/taller-abierto-expresion-oral.json` | Espacio Cultural |
| **novels** | `novels/las-indignas.json` | `active: true` — novel of the month |
| **events** | `events/streaming-jueves.json` | Featured streaming / transmisión |

---

## Schemas

### Post (`content/posts/*.json`)

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Title |
| `author` | string | Author name |
| `date` | string | ISO date (`YYYY-MM-DD`) for sorting |
| `displayDate` | string | Human-readable date |
| `excerpt` | string | Short summary |
| `tags` | string[] | Tags |
| `image` | string | Image path or URL |
| `featured` | boolean | Optional; hero banner when true (default false) |

Slug = filename without `.json`.

### Novel (`content/novels/*.json`)

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Title |
| `coverImage` | string | Cover image path |
| `description` | string | Description (Markdown allowed in UI) |
| `active` | boolean | `true` = current “novel of the month” |

### Event (`content/events/*.json`)

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Title |
| `date` | string | ISO date for sorting |
| `displayDate` | string | Visible date |
| `summary` | string | Short summary |
| `schedule` | string | Schedule text |
| `ctaLabel` | string | Button label |
| `ctaHref` | string | Button URL |
| `category` | string | e.g. streaming category filter |
| `featured` | boolean | Hero banner + radio featured slot when true |

---

## Editing content

1. Add or edit files under `posts/`, `novels/`, or `events/`
2. Match the schemas above
3. Run `npm run lint` and `npm run build:pages` (see root `README.md`)
4. Commit JSON changes and updated `docs/` to branch **`master`**

---

## After content changes

```bash
npm run lint
npm run build:pages
# Commit content/ and docs/, then push to master
```

If TypeScript fails, check field names against `PostEntry`, `NovelEntry`, and `EventEntry` in `lib/content.ts`.

---

## Troubleshooting

| Issue | Check |
|-------|--------|
| Post not on site | Valid JSON, correct folder, rebuild + redeploy `docs/` |
| Wrong novel on club page | Only one novel should have `active: true` |
| Featured event missing | `featured: true` and optional `category` match in `getFeaturedEvent` |
| Broken images on GitHub Pages | Paths respect `basePath` `/sarava-radio-streaming` in production |
