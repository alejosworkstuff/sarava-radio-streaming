import type { Metadata } from "next";
import { CulturalPostsList } from "../components/cultural-posts";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getPosts } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site-metadata";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "Espacio cultural",
    description:
      "Noticias, talleres y novedades del proyecto Saravá. Publicaciones sobre cultura, encuentros y actividades comunitarias.",
    path: "/espacio-cultural",
  });
}

export default async function EspacioCulturalPage() {
  const posts = await getPosts();

  return (
    <div className="page">
      <SiteHeader pill="Espacio Cultural Sarava" title="Espacio Cultural Sarava" />

      <main>
        <section className="section">
          <h2 className="section-title">Espacio cultural</h2>
          <p className="hero-subtitle">
            Aquí reunimos noticias, talleres y novedades del proyecto. La
            portada destaca una selección de estas publicaciones.
          </p>
          {posts.length === 0 ? (
            <p className="hero-subtitle">
              Todavía no hay publicaciones en el Espacio Cultural.
            </p>
          ) : (
            <CulturalPostsList posts={posts} />
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
