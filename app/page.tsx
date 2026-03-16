import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="page">
      <header className="site-header site-header--home">
        <div className="brand">
          <Image
            src="/logo.jpg"
            alt="Logo del Centro Cultural Saravá"
            width={80}
            height={80}
            className="brand-logo"
            priority
          />
          <div>
            <p className="pill">Centro Cultural Saravá</p>
            <h1 className="brand-name">Un lugar para compartir voces</h1>
          </div>
        </div>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/radio-streaming">Saravá radio streaming</Link>
          <Link href="/podcast">Saravá Podcast</Link>
          <Link href="/sobre-nosotras">Sobre nosotras</Link>
          <Link href="/club-lectura">Club de lectura Saravá</Link>
          <Link href="/espacio-cultural">Saravá Espacio Cultural</Link>
        </nav>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">Últimas publicaciones</h2>
          <p className="hero-subtitle">
            Este es el espacio donde van los posteos. El nuevo aparece arriba y
            los anteriores bajan.
          </p>
          <div className="post-list">
            <article className="post-card">
              <div className="post-header">
                <Image
                  src="/foto-1.jpg"
                  alt="Foto de Mariana Sosa"
                  width={56}
                  height={56}
                  className="avatar"
                />
                <div>
                  <p className="post-meta">Mariana Sosa · 12 de marzo, 2026</p>
                  <h3 className="post-title">Publicación reciente</h3>
                </div>
              </div>
              <p className="hero-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="post-tags">
                <span className="pill">Comunidad</span>
                <span className="pill">Agenda</span>
              </div>
            </article>
            <article className="post-card">
              <div className="post-header">
                <Image
                  src="/foto-2.jpg"
                  alt="Foto de Lucía Pérez"
                  width={56}
                  height={56}
                  className="avatar"
                />
                <div>
                  <p className="post-meta">Lucía Pérez · 5 de marzo, 2026</p>
                  <h3 className="post-title">Publicación anterior</h3>
                </div>
              </div>
              <p className="hero-subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <div className="post-tags">
                <span className="pill">Radio</span>
                <span className="pill">Historias</span>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          ¿Querés sumarte o enviar información? Escribinos a{" "}
          <strong>sarava@ejemplo.com</strong>
        </p>
        <p>San Carlos de Bolívar - Buenos Aires</p>
      </footer>
    </div>
  );
}
