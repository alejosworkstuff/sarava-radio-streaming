# Content directory — Espacio Cultural Saravá

JSON files in this folder power the site. Loaders live in `lib/content.ts` at the project root.

**Live site:** [alejosworkstuff.github.io/sarava-radio-streaming](https://alejosworkstuff.github.io/sarava-radio-streaming/)  
**CMS admin (local):** `/admin` after `npm run dev`

---

## Overview

| Folder | Used on | Loader |
|--------|---------|--------|
| `posts/` | `/espacio-cultural`, home grid | `getPosts()` |
| `novels/` | `/club-lectura`, home hero | `getNovelOfTheMonth()`, `getNovels()` |
| `events/` | `/radio-streaming`, featured blocks | `getEvents()`, `getFeaturedEvent(category?)` |

Content is:

- Version-controlled in Git
- Editable via **Decap CMS** (`public/admin/config.yml`)
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
| `featured` | boolean | Show in featured slots when true |

---

## Editing content

### Option 1 — Decap CMS (recommended for editors)

1. Run `npm run dev`
2. Open `http://localhost:3000/admin`
3. Use collections **Publicaciones**, **Novela del mes**, **Eventos**
4. Commit JSON changes to branch **`master`**

`public/admin/config.yml` uses `local_backend: true` for local editing. Production notes in that file describe Netlify Identity + git-gateway.

### Option 2 — Edit JSON directly

1. Add or edit files under `posts/`, `novels/`, or `events/`
2. Match the schemas above
3. Run `npm run build` and update `docs/` for GitHub Pages (see root `README.md`)

---

## After content changes

```bash
npm run lint
npm run build
# Copy out/ → docs/ and commit for GitHub Pages
```

If TypeScript fails, check field names against `PostEntry`, `NovelEntry`, and `EventEntry` in `lib/content.ts`.

---

## Troubleshooting

| Issue | Check |
|-------|--------|
| Post not on site | Valid JSON, correct folder, rebuild + redeploy `docs/` |
| Wrong novel on club page | Only one novel should have `active: true` |
| Featured event missing | `featured: true` and optional `category` match in `getFeaturedEvent` |
| CMS cannot save | Branch `master`, git-gateway / local_backend config |
| Broken images on GitHub Pages | Paths respect `basePath` `/sarava-radio-streaming` in production |
