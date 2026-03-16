import Image from "next/image";
import Link from "next/link";

export default function RadioStreamingPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="page">
      <header className="site-header">
        <div className="brand">
          <Image
            src={`${basePath}/logo.jpg`}
            alt="Logo del Centro Cultural Saravá"
            width={64}
            height={64}
            className="brand-logo"
          />
          <div>
            <p className="pill">Saravá radio streaming</p>
            <h1 className="brand-name">Centro Cultural Saravá</h1>
          </div>
        </div>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/podcast">Saravá Podcast</Link>
          <Link href="/sobre-nosotras">Sobre nosotras</Link>
          <Link href="/club-lectura">Club de lectura Saravá</Link>
          <Link href="/espacio-cultural">Saravá Espacio Cultural</Link>
        </nav>
      </header>

      <main>
        <section className="section">
          <h2 className="section-title">Streaming en vivo</h2>
          <p className="hero-subtitle">
            Espacio para escuchar la transmisión en tiempo real y enterarte de
            próximos horarios.
          </p>
          <div className="list">
            <article className="list-item">
              <h3>Estado</h3>
              <p className="hero-subtitle">Transmisión próximamente.</p>
            </article>
            <article className="list-item">
              <h3>Horario habitual</h3>
              <p className="hero-subtitle">Viernes 20:00.</p>
            </article>
            <article className="list-item">
              <h3>Contacto</h3>
              <p className="hero-subtitle">sarava@ejemplo.com</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Querés sumar tu audio: sarava@ejemplo.com</p>
        <Link href="/" className="pill">
          Volver al inicio
        </Link>
      </footer>
    </div>
  );
}
