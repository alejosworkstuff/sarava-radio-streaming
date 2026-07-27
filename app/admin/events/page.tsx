import {
  createEventAction,
  deleteEventAction,
  updateEventAction,
} from "@/app/actions/cms";
import { AdminForm, DeleteButton } from "../components/admin-form";
import { prisma } from "@/lib/db";

function toIsoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Contenido</p>
        <h1>Eventos</h1>
        <p>Transmisiones, talleres y encuentros destacados.</p>
      </header>

      <section className="admin-panel">
        <h2>Nuevo evento</h2>
        <AdminForm
          action={createEventAction}
          submitLabel="Crear evento"
          resetOnSuccess
        >
          <label>
            Título
            <input name="title" required />
          </label>
          <label>
            Fecha
            <input name="date" type="date" required />
          </label>
          <label>
            Fecha visible (opcional)
            <input name="displayDate" />
          </label>
          <label>
            Resumen
            <textarea name="summary" rows={3} required />
          </label>
          <label>
            Horario / agenda
            <input name="schedule" required />
          </label>
          <label>
            Texto del botón
            <input name="ctaLabel" defaultValue="Ver más" required />
          </label>
          <label>
            Link del botón
            <input name="ctaHref" type="url" required />
          </label>
          <label>
            Categoría
            <input name="category" defaultValue="radio" required />
          </label>
          <label className="admin-check">
            <input name="featured" type="checkbox" />
            Destacado (hero + radio)
          </label>
          <label className="admin-check">
            <input name="published" type="checkbox" defaultChecked />
            Publicado
          </label>
        </AdminForm>
      </section>

      <section className="admin-panel">
        <h2>Eventos ({events.length})</h2>
        <div className="admin-list">
          {events.map((event) => (
            <article key={event.id} className="admin-item">
              <AdminForm action={updateEventAction} submitLabel="Guardar cambios">
                <input type="hidden" name="id" value={event.id} />
                <p className="admin-item-meta">slug: {event.slug}</p>
                <label>
                  Título
                  <input name="title" defaultValue={event.title} required />
                </label>
                <label>
                  Fecha
                  <input
                    name="date"
                    type="date"
                    defaultValue={toIsoDate(event.date)}
                    required
                  />
                </label>
                <label>
                  Fecha visible
                  <input name="displayDate" defaultValue={event.displayDate} />
                </label>
                <label>
                  Resumen
                  <textarea
                    name="summary"
                    rows={3}
                    defaultValue={event.summary}
                    required
                  />
                </label>
                <label>
                  Horario / agenda
                  <input name="schedule" defaultValue={event.schedule} required />
                </label>
                <label>
                  Texto del botón
                  <input name="ctaLabel" defaultValue={event.ctaLabel} required />
                </label>
                <label>
                  Link del botón
                  <input
                    name="ctaHref"
                    type="url"
                    defaultValue={event.ctaHref}
                    required
                  />
                </label>
                <label>
                  Categoría
                  <input name="category" defaultValue={event.category} required />
                </label>
                <label className="admin-check">
                  <input
                    name="featured"
                    type="checkbox"
                    defaultChecked={event.featured}
                  />
                  Destacado (hero + radio)
                </label>
                <label className="admin-check">
                  <input
                    name="published"
                    type="checkbox"
                    defaultChecked={event.published}
                  />
                  Publicado
                </label>
              </AdminForm>
              <DeleteButton action={deleteEventAction} id={event.id} />
            </article>
          ))}
          {events.length === 0 ? <p>No hay eventos todavía.</p> : null}
        </div>
      </section>
    </div>
  );
}
