import { CulturalPostsList } from "./components/cultural-posts";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { getPosts } from "../lib/content";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="page">
      <SiteHeader
        pill="Centro Cultural Saravá"
        title="Un lugar para compartir voces"
        home
      />

      <main>
        <section className="section">
          <h2 className="section-title">Últimas publicaciones</h2>
          <p className="hero-subtitle">
            Esta selección reúne las publicaciones destacadas de Espacio
            Cultural. Las más recientes aparecen primero.
          </p>
          <CulturalPostsList posts={posts} variant="showcase" />
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}
