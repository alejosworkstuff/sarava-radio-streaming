import { updateAboutAction } from "@/app/actions/cms";
import { AdminForm } from "../components/admin-form";
import { prisma } from "@/lib/db";
import type { AboutContent } from "@/lib/content";

export default async function AdminAboutPage() {
  const about = await prisma.about.findUnique({ where: { id: "about" } });

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

  const highlights = about.highlights as AboutContent["highlights"];
  const team = about.team as AboutContent["team"];

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Contenido</p>
        <h1>Sobre nosotras</h1>
        <p>
          Editá los párrafos (separados por una línea en blanco). Highlights y
          equipo van en JSON por ahora; podés subir fotos nuevas del equipo.
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
          <label>
            Highlights (JSON)
            <textarea
              name="highlightsJson"
              rows={12}
              defaultValue={JSON.stringify(highlights, null, 2)}
              required
            />
          </label>
          <label>
            Equipo (JSON)
            <textarea
              name="teamJson"
              rows={16}
              defaultValue={JSON.stringify(team, null, 2)}
              required
            />
          </label>
          <div className="admin-team-uploads">
            <p className="admin-item-meta">
              Opcional: reemplazar foto por integrante (mismo orden del JSON)
            </p>
            {team.map((member, index) => (
              <label key={`${member.name}-${index}`}>
                Foto — {member.name}
                <input
                  name={`teamImage-${index}`}
                  type="file"
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </AdminForm>
      </section>
    </div>
  );
}
