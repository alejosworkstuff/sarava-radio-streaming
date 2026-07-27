import { NovelEditor } from "../components/novel-editor";
import { prisma } from "@/lib/db";

export default async function AdminNovelsPage() {
  const novels = await prisma.novel.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Contenido</p>
        <h1>Novelas</h1>
        <p>
          Club de lectura y novela del mes. Podés adjuntar un PDF para descarga
          pública. Los borradores no publicados se guardan en este navegador.
        </p>
      </header>

      <section className="admin-panel">
        <h2>Nueva novela</h2>
        <NovelEditor
          mode="create"
          initial={{
            title: "",
            description: "",
            active: false,
            published: false,
          }}
        />
      </section>

      <section className="admin-panel">
        <h2>Novelas ({novels.length})</h2>
        <div className="admin-list">
          {novels.map((novel) => (
            <article key={novel.id} className="admin-item">
              <p className="admin-item-meta">slug: {novel.slug}</p>
              <NovelEditor
                mode="edit"
                initial={{
                  id: novel.id,
                  title: novel.title,
                  description: novel.description,
                  coverImage: novel.coverImage,
                  pdfUrl: novel.pdfUrl,
                  active: novel.active,
                  published: novel.published,
                }}
              />
            </article>
          ))}
          {novels.length === 0 ? <p>No hay novelas todavía.</p> : null}
        </div>
      </section>
    </div>
  );
}
