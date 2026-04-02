import { CulturalPostsList } from "../components/cultural-posts";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getPosts } from "../../lib/content";

export default async function EspacioCulturalPage() {
  const posts = await getPosts();

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
          <CulturalPostsList posts={posts} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
