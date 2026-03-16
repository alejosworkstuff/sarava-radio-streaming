import Image from "next/image";
import Link from "next/link";

export default function EspacioCulturalPage() {
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
            <p className="pill">Saravá Espacio Cultural</p>
            <h1 className="brand-name">Centro Cultural Saravá</h1>
          </div>
        </div>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/radio-streaming">Saravá radio streaming</Link>
          <Link href="/podcast">Saravá Podcast</Link>
          <Link href="/sobre-nosotras">Sobre nosotras</Link>
          <Link href="/club-lectura">Club de lectura Saravá</Link>
        </nav>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">Espacio Cultural</h2>
          <p className="hero-subtitle">
            Un lugar para talleres, encuentros, ferias y actividades abiertas a
            la comunidad.
          </p>
          <div className="list">
            <article className="list-item">
              <h3>Salón principal</h3>
              <p className="hero-subtitle">
                Capacidad para encuentros, charlas y presentaciones.
              </p>
            </article>
            <article className="list-item">
              <h3>Espacios abiertos</h3>
              <p className="hero-subtitle">
                Patio y zonas comunes para actividades culturales.
              </p>
            </article>
            <article className="list-item">
              <h3>Reservas</h3>
              <p className="hero-subtitle">Contacto: sarava@ejemplo.com</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Querés usar el espacio: sarava@ejemplo.com</p>
        <Link href="/" className="pill">
          Volver al inicio
        </Link>
      </footer>
    </div>
  );
}
