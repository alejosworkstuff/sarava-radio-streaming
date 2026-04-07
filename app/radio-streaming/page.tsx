import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getFeaturedEvent } from "../../lib/content";

export default async function RadioStreamingPage() {
  const event = await getFeaturedEvent("radio");

  return (
    <div className="page">
      <SiteHeader
        pill="Saravá radio streaming"
        title="Espacio Cultural Sarava"
      />

      <main>
        <section className="section">
          <h2 className="section-title">Streaming en vivo</h2>
          <p className="hero-subtitle">
            Espacio para escuchar la transmisión en tiempo real y enterarte de
            próximos horarios.
          </p>
          <div className="list">
            <article className="list-item live-card">
              <div className="cta-stack">
                <a
                  className="cta cta-large"
                  href={event?.ctaHref ?? "https://www.youtube.com/watch?v=QPpt4QqgXBQ"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir transmisión en vivo en YouTube"
                >
                  {event?.ctaLabel ?? "Miranos en directo"}
                </a>
                <p className="hero-subtitle">
                  {event?.schedule ?? "Horario habitual: jueves 19:00 a 21:00."}
                </p>
                {event?.summary ? (
                  <p className="hero-subtitle">{event.summary}</p>
                ) : null}
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

