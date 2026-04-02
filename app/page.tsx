import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { culturalPosts } from "./content";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
          <Link
            href="/espacio-cultural"
            className="posts-shell posts-shell-link"
            aria-label="Leer más en Espacio Cultural"
          >
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
            <div className="posts-shell-overlay" aria-hidden="true">
              <span className="posts-shell-overlay-text">Leer más</span>
            </div>
          </Link>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}