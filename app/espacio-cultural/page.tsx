import { CulturalPostsList } from "../components/cultural-posts";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function EspacioCulturalPage() {
  return (
    <div className="page">
      <SiteHeader pill="Saravá Espacio Cultural" title="Centro Cultural Saravá" />

      <main>
        <section className="section">
          <h2 className="section-title">Espacio cultural</h2>
          <p className="hero-subtitle">
            Aquí reunimos noticias, talleres y novedades del proyecto. La
            portada destaca una selección de estas publicaciones.
          </p>
          <CulturalPostsList />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
