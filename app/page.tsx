import Link from "next/link";
import { CulturalPostsList } from "./components/cultural-posts";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import HeroBanner from "./components/hero-banner";
import { getPosts } from "../lib/content";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="page">
      {/* Original layout comment for revert:
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
      */}
      <SiteHeader
        pill="Centro Cultural Saravá"
        title="Un lugar para compartir voces"
        home
      />

      <main>
        <HeroBanner />
        
        <section className="section">
          <h2 className="section-title">Últimas publicaciones</h2>
          <p className="hero-subtitle">
            Esta selección reúne las publicaciones destacadas de Espacio
            Cultural. Las más recientes aparecen primero.
          </p>
          <div className="posts-grid">
            <CulturalPostsList posts={posts.slice(0,6)} variant="list" />
          </div>
          <div className="cta-strip">
            <Link href="/espacio-cultural" className="cta">
              Ver todas las publicaciones
            </Link>
          </div>
          {/* Revert: Remove HeroBanner, posts-grid, cta-strip, Link import, HeroBanner import to original */}
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}

