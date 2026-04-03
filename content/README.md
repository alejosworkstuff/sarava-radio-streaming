# 📁 Content Directory / Directorio de Contenido

[![Next.js](https://img.shields.io/badge/Next.js-15-blue?style=flat&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Decap CMS](https://img.shields.io/badge/Decap%20CMS-2.x-orange?style=flat&logo=decapcms)](https://decapcms.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![JSON](https://img.shields.io/badge/Format-JSON-yellow?style=flat&logo=json)](https://json.org)

## 🌟 Overview / Resumen

This directory serves as the **central hub for editable content** powering the Sarava project - a cultural platform featuring Espacio Cultural posts, Club de Lectura novels, and featured events/transmisiones.

Content is stored in **JSON files with frontmatter**, making it:
- ✅ **Headless CMS-ready** (edited via Decap CMS at `/admin`)
- ✅ **Version-controlled** (Git-friendly)
- ✅ **Type-safe** (via `lib/content.ts`)
- ✅ **Dynamic** (fetched server-side/client-side)

Current content (as of last scan):
- **2 Posts** (Espacio Cultural)
- **1 Novel** (Club de Lectura)
- **1 Event** (Transmisiones)

## 📂 Structure / Estructura

| Folder / Carpeta | Purpose / Propósito | Current Files / Archivos Actuales | Used In / Usado En |
|------------------|---------------------|-----------------------------------|--------------------|
| `posts/` | Espacio Cultural publications: talleres, encuentros, articles. | `encuentro-cultural-fin-de-semana.json`<br>`taller-abierto-expresion-oral.json` | `/espacio-cultural`, home grid |
| `novels/` | Novela del mes for Club de Lectura. | `las-indignas.json` | `/club-lectura`, hero featured |
| `events/` | Events y transmisiones destacadas (streaming, podcasts). | `streaming-jueves.json` | `/events`, `/radio-streaming`, home |

**Expansion:** Add subfolders or new types as needed (e.g., `podcasts/`, `podcasts/`).

## 📋 File Schema / Esquema de Archivos

All JSON files follow this **standardized frontmatter schema**:

```json
{
  "title": "Título atractivo y SEO-friendly",
  "slug": "encuentro-cultural-fin-de-semana",
  "date": "2024-10-12",
  "excerpt": "Breve descripción (160 chars)",
  "image": "/uploads/evento-fin-semana.jpg",
  "tags": ["espacio-cultural", "encuentro", "presencial"],
  "author": "Nombre Autor",
  "body": "## Markdown content\\n\\nContenido completo con headings, lists, images..."
}
```

**Fields explained:**
- `slug`: URL-friendly (kebab-case, no spaces)
- `date`: ISO format (YYYY-MM-DD)
- `body`: Full **Markdown** content (headings, lists, images, links)
- `image`: Relative to `/public/uploads/` (admin uploads)

## ✏️ Adding & Editing Content / Agregar y Editar

### 1. **Via Decap CMS (Recommended)**
```
1. Run dev server: npm run dev
2. Go to http://localhost:3000/admin
3. Login (configured collections map to these folders)
4. Create/Edit → Auto-saves JSON
5. Preview changes live!
```

### 2. **Manual Editing**
```
1. Create new file: posts/mi-evento.json
2. Copy schema above
3. Add to /public/uploads/ for images
4. Restart dev or hot-reload
```

### 3. **Validation**
Run `npm run lint` or check TypeScript errors in `lib/content.ts`.

## 🔗 Integration / Integración

Content loaded via `@/lib/content.ts`:

```typescript
// Example usage in page.tsx
const posts = await getContent('posts');
const novel = await getContent('novels')[0]; // Featured
```

- **Server Components**: `getStaticProps` style, cached.
- **Dynamic**: Revalidates on edit (Next.js ISR).
- **TypeScript**: Inferred from schema.

## 🏗️ Examples / Ejemplos

**Sample Post (posts/encuentro-cultural-fin-de-semana.json excerpt):**
```json
{
  "title": "Encuentro Cultural: Fin de Semana",
  "body": "## ¡No te lo pierdas!\\n\\nEste sábado..."
}
```

**Full files in repo for reference.**

## 💡 Best Practices / Mejores Prácticas

✅ **Do:**
- Use Spanish titles/descriptions (site locale)
- Optimize images (<500KB, WebP)
- SEO: Keywords in title/excerpt
- Accessibility: Alt text, semantic Markdown
- Consistent slugs/dates

❌ **Avoid:**
- Large images (use /public/uploads/)
- Raw HTML in body (use Markdown)
- Special chars in slugs

## 🧪 Development & Testing

1. **Local Setup:**
   ```
   cd sarava/sarava-project
   npm install
   npm run dev
   ```

2. **Content Preview:**
   - Edit JSON → Hot reload in pages
   - Admin: localhost:3000/admin

3. **Build Test:**
   ```
   npm run build
   npm run start
   ```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Content not updating | Clear cache: `rm .next/cache`, restart |
| Decap CMS 404 | Check `config.yml` collections |
| Invalid JSON | Validate with jsonlint.com |
| Images broken | Place in `/public/uploads/` |

## 🚀 Next Steps
- Add more sample content
- Podcast episodes folder
- Multi-language support (en/es)
- Content search/index page

**Contribute:** Edit JSON files or propose schema changes!

---

*Last updated: $(date)* | [Edit on GitHub](https://github.com/user/sarava-project/edit/main/content/README.md)
