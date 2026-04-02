import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function RadioStreamingPage() {
  return (
    <div className="page">
      <SiteHeader
        pill="Saravá radio streaming"
        title="Centro Cultural Saravá"
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
                  href="https://www.youtube.com/watch?v=QPpt4QqgXBQ"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir transmisión en vivo en YouTube"
                >
                  Miranos en directo
                </a>
                <p className="hero-subtitle">
                  Horario habitual: jueves 19:00 a 21:00.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}