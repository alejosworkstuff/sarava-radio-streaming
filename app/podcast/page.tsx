import Image from "next/image";
import Link from "next/link";

export default function PodcastPage() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <Image
            src="/logo.jpg"
            alt="Logo del Centro Cultural Saravá"
            width={64}
            height={64}
            className="brand-logo"
          />
          <div>
            <p className="pill">Saravá Podcast</p>
            <h1 className="brand-name">Centro Cultural Saravá</h1>
          </div>
        </div>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/radio-streaming">Saravá radio streaming</Link>
          <Link href="/sobre-nosotras">Sobre nosotras</Link>
          <Link href="/club-lectura">Club de lectura Saravá</Link>
          <Link href="/espacio-cultural">Saravá Espacio Cultural</Link>
        </nav>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">Episodios</h2>
          <p className="hero-subtitle">
            Archivo de entrevistas y relatos compartidos por la comunidad.
          </p>
          <div className="list">
            <article className="list-item">
              <h3>2025</h3>
              <p className="hero-subtitle">
                Temporada con historias de barrio, memoria local y encuentros.
              </p>
            </article>
            <article className="list-item">
              <h3>2026</h3>
              <p className="hero-subtitle">
                Nuevos ciclos con entrevistas y temas actuales.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Querés compartir un episodio: sarava@ejemplo.com</p>
        <Link href="/" className="pill">
          Volver al inicio
        </Link>
      </footer>
    </div>
  );
}
