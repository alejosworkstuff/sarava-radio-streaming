import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from "@/app/actions/cms";
import { AdminArchive, type AdminArchiveItem } from "../components/admin-archive";
import { AdminForm, DeleteButton } from "../components/admin-form";
import { ImageField } from "../components/image-field";
import { getLogoUrl } from "@/lib/content";
import { resolvePublicAssetSrc } from "@/lib/hero-slides";
import { prisma } from "@/lib/db";

function toIsoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

export default async function AdminPostsPage() {
  const [posts, logoUrl] = await Promise.all([
    prisma.post.findMany({ orderBy: { date: "desc" } }),
    getLogoUrl(),
  ]);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const fallbackThumbnail = resolvePublicAssetSrc(logoUrl || "/logo.jpg", basePath);
  const archiveItems: AdminArchiveItem[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    date: toIsoDate(post.date),
    displayDate: post.displayDate || toIsoDate(post.date),
    thumbnail: resolvePublicAssetSrc(post.image || logoUrl, basePath),
    editor: (
      <>
        <p className="admin-item-meta">slug: {post.slug}</p>
        <div className="admin-archive-actions">
          <AdminForm action={updatePostAction} submitLabel="Guardar cambios">
            <input type="hidden" name="id" value={post.id} />
            <label>
              Título
              <input name="title" defaultValue={post.title} required />
            </label>
            <label>
              Autora / autor
              <input name="author" defaultValue={post.author} required />
            </label>
            <label>
              Fecha
              <input
                name="date"
                type="date"
                defaultValue={toIsoDate(post.date)}
                required
              />
            </label>
            <label>
              Fecha visible
              <input name="displayDate" defaultValue={post.displayDate} />
            </label>
            <label>
              Extracto
              <textarea
                name="excerpt"
                rows={3}
                defaultValue={post.excerpt}
                required
              />
            </label>
            <label>
              Tags
              <input name="tags" defaultValue={post.tags.join(", ")} required />
            </label>
            <ImageField
              name="image"
              label="Reemplazar imagen"
              existingSrc={
                post.image
                  ? resolvePublicAssetSrc(post.image, basePath)
                  : null
              }
              existingCaption="Imagen actual"
              emptyHint="Sin imagen (layout texto)"
            />
            <label className="admin-check">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={post.featured}
              />
              Destacado (hero inicio)
            </label>
            <label className="admin-check">
              <input
                name="published"
                type="checkbox"
                defaultChecked={post.published}
              />
              Publicado
            </label>
          </AdminForm>
          <DeleteButton action={deletePostAction} id={post.id} />
        </div>
      </>
    ),
  }));

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Contenido</p>
        <h1>Posts</h1>
        <p>Creá y editá publicaciones del espacio cultural.</p>
      </header>

      <section className="admin-panel">
        <h2>Nuevo post</h2>
        <AdminForm
          action={createPostAction}
          submitLabel="Crear post"
          resetOnSuccess
        >
          <label>
            Título
            <input name="title" required />
          </label>
          <label>
            Autora / autor
            <input name="author" required />
          </label>
          <label>
            Fecha (YYYY-MM-DD)
            <input name="date" type="date" required />
          </label>
          <label>
            Fecha visible (opcional)
            <input name="displayDate" placeholder="5 de marzo, 2026" />
          </label>
          <label>
            Extracto
            <textarea name="excerpt" rows={4} required />
          </label>
          <label>
            Tags (separados por coma)
            <input name="tags" placeholder="Cultura, Historias" required />
          </label>
          <ImageField
            name="image"
            label="Imagen (opcional: sin imagen el hero usa layout de texto)"
            emptyHint="Sin imagen seleccionada"
          />
          <label className="admin-check">
            <input name="featured" type="checkbox" />
            Destacado (hero inicio)
          </label>
          <label className="admin-check">
            <input name="published" type="checkbox" defaultChecked />
            Publicado
          </label>
        </AdminForm>
      </section>

      <section className="admin-panel">
        <AdminArchive
          title="Publicaciones por fecha"
          itemLabel="publicaciones"
          itemLabelSingular="publicación"
          items={archiveItems.map((item) => ({
            ...item,
            thumbnail: item.thumbnail || fallbackThumbnail,
          }))}
        />
      </section>
    </div>
  );
}
