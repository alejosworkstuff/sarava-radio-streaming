import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { buildPageMetadata } from "@/lib/site-metadata";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "Saravá Podcast",
    description:
      "Episodios con entrevistas, historias y voces locales en el canal de YouTube de Saravá. Escuchá todos los programas del podcast comunitario.",
    path: "/podcast",
  });
}

export default function PodcastPage() {
  return (
    <div className="page">
      <SiteHeader pill="Saravá Podcast" title="Espacio Cultural Sarava" />

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
