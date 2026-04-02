import Image from "next/image";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { culturalPosts } from "../content";

export default function EspacioCulturalPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
          <div className="post-list">
            {culturalPosts.map((post) => (
              <article className="post-card" key={`${post.title}-${post.date}`}>
                <div className="post-header">
                  <Image
                    src={`${basePath}${post.image}`}
                    alt={`Foto de ${post.author}`}
                    width={56}
                    height={56}
                    className="avatar"
                  />
                  <div>
                    <p className="post-meta">{`${post.author} · ${post.date}`}</p>
                    <h3 className="post-title">{post.title}</h3>
                  </div>
                </div>
                <p className="hero-subtitle">{post.excerpt}</p>
                <div className="post-tags">
                  {post.tags.map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}