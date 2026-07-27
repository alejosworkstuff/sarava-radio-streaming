import {
  createNovelAction,
  deleteNovelAction,
  updateNovelAction,
} from "@/app/actions/cms";
import { AdminForm, DeleteButton } from "../components/admin-form";
import { prisma } from "@/lib/db";

export default async function AdminNovelsPage() {
  const novels = await prisma.novel.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Contenido</p>
        <h1>Novelas</h1>
        <p>Club de lectura y novela del mes.</p>
      </header>

      <section className="admin-panel">
        <h2>Nueva novela</h2>
        <AdminForm
          action={createNovelAction}
          submitLabel="Crear novela"
          resetOnSuccess
        >
          <label>
            Título
            <input name="title" required />
          </label>
          <label>
            Descripción
            <textarea name="description" rows={6} required />
          </label>
          <label>
            Tapa
            <input name="coverImage" type="file" accept="image/*" required />
          </label>
          <label className="admin-check">
            <input name="active" type="checkbox" />
            Novela del mes (activa)
          </label>
          <label className="admin-check">
            <input name="published" type="checkbox" defaultChecked />
            Publicada
          </label>
        </AdminForm>
      </section>

      <section className="admin-panel">
        <h2>Novelas ({novels.length})</h2>
        <div className="admin-list">
          {novels.map((novel) => (
            <article key={novel.id} className="admin-item">
              <AdminForm action={updateNovelAction} submitLabel="Guardar cambios">
                <input type="hidden" name="id" value={novel.id} />
                <p className="admin-item-meta">slug: {novel.slug}</p>
                <label>
                  Título
                  <input name="title" defaultValue={novel.title} required />
                </label>
                <label>
                  Descripción
                  <textarea
                    name="description"
                    rows={6}
                    defaultValue={novel.description}
                    required
                  />
                </label>
                <p className="admin-item-meta">Tapa actual: {novel.coverImage}</p>
                <label>
                  Reemplazar tapa
                  <input name="coverImage" type="file" accept="image/*" />
                </label>
                <label className="admin-check">
                  <input
                    name="active"
                    type="checkbox"
                    defaultChecked={novel.active}
                  />
                  Novela del mes (activa)
                </label>
                <label className="admin-check">
                  <input
                    name="published"
                    type="checkbox"
                    defaultChecked={novel.published}
                  />
                  Publicada
                </label>
              </AdminForm>
              <DeleteButton action={deleteNovelAction} id={novel.id} />
            </article>
          ))}
          {novels.length === 0 ? <p>No hay novelas todavía.</p> : null}
        </div>
      </section>
    </div>
  );
}
