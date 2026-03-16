import Image from "next/image";
import Link from "next/link";

export default function ClubLecturaPage() {
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
            <p className="pill">Club de lectura Saravá</p>
            <h1 className="brand-name">Centro Cultural Saravá</h1>
          </div>
        </div>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/radio-streaming">Saravá radio streaming</Link>
          <Link href="/podcast">Saravá Podcast</Link>
          <Link href="/sobre-nosotras">Sobre nosotras</Link>
          <Link href="/espacio-cultural">Saravá Espacio Cultural</Link>
        </nav>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">La novela del Mes</h2>
          <p className="hero-subtitle">
            Espacio para compartir lecturas, fragmentos y encuentros alrededor
            de la novela elegida.
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">Poesía</h2>
          <p className="hero-subtitle">
            Recomendaciones, lectura en voz alta y textos para compartir en
            comunidad.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>Sumate al club: sarava@ejemplo.com</p>
        <Link href="/" className="pill">
          Volver al inicio
        </Link>
      </footer>
    </div>
  );
}
