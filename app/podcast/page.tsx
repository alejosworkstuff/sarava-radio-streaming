import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function PodcastPage() {
  return (
    <div className="page">
      <SiteHeader pill="Saravá Podcast" title="Centro Cultural Saravá" />

      <main>
        <section className="hero" style={{ textAlign: "center" }}>
          <div>
            <p className="pill">Saravá Podcast</p>
            <h2 className="hero-title">Nuestro canal en YouTube</h2>
            <p className="hero-subtitle">
              Escuchá todos los episodios y novedades directamente en nuestro
              canal.
            </p>
            <a
              className="cta"
              href="https://www.youtube.com/@SaravaGente/videos"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir el canal de Saravá en YouTube"
            >
              Ir al canal de YouTube
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
