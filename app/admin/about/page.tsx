import { updateAboutAction } from "@/app/actions/cms";
import { AdminForm } from "../components/admin-form";
import { TeamEditor } from "../components/team-editor";
import type { AboutContent } from "@/lib/content";
import { prisma } from "@/lib/db";

export default async function AdminAboutPage() {
  const about = await prisma.about.findUnique({ where: { id: "about" } });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (!about) {
    return (
      <div className="admin-page">
        <header className="admin-page-header">
          <h1>Sobre nosotras</h1>
          <p>Falta el contenido. Corré `npm run db:seed`.</p>
        </header>
      </div>
    );
  }

  const team = about.team as AboutContent["team"];

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Contenido</p>
        <h1>Sobre nosotras</h1>
        <p>
          Editá los párrafos (separados por una línea en blanco) y gestioná el
          equipo: nombres, descripciones y fotos.
        </p>
      </header>

      <section className="admin-panel">
        <AdminForm action={updateAboutAction} submitLabel="Guardar cambios">
          <label>
            Párrafos
            <textarea
              name="paragraphs"
              rows={14}
              defaultValue={about.paragraphs.join("\n\n")}
              required
            />
          </label>
          <TeamEditor
            key={about.updatedAt.toISOString()}
            initial={team}
            basePath={basePath}
          />
        </AdminForm>
      </section>
    </div>
  );
}
