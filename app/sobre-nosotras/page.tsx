import Image from "next/image";
import Link from "next/link";

export default function SobreNosotrasPage() {
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
            <p className="pill">Sobre nosotras</p>
            <h1 className="brand-name">Centro Cultural Saravá</h1>
          </div>
        </div>
        <nav className="nav-links" aria-label="Navegación principal">
          <Link href="/">Inicio</Link>
          <Link href="/radio-streaming">Saravá radio streaming</Link>
          <Link href="/podcast">Saravá Podcast</Link>
          <Link href="/club-lectura">Club de lectura Saravá</Link>
          <Link href="/espacio-cultural">Saravá Espacio Cultural</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div>
            <h2 className="hero-title">
              Tu espacio comunitario para estar al día y acompañadas.
            </h2>
            <p className="hero-subtitle">
              Somos un colectivo de mujeres que comparte noticias, encuentros y
              un programa de radio con historias reales y cercanas.
            </p>
            <Link href="/radio-streaming" className="cta">
              Escuchar streaming
            </Link>
          </div>
          <div className="hero-card">
            <p className="pill">Novedades</p>
            <h3>Esta semana</h3>
            <p className="hero-subtitle">
              Taller abierto de expresión oral - Jueves 18:00 - Cupos limitados.
            </p>
            <p className="hero-subtitle">
              Episodio nuevo: "Historias que nos sostienen".
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="secciones">
          <h2 className="section-title" id="secciones">
            Lo que vas a encontrar
          </h2>
          <div className="section-grid">
            <article className="feature-card">
              <h3>Saravá Podcast</h3>
              <p className="hero-subtitle">
                Episodios con entrevistas, historias y voces locales.
              </p>
              <Link href="/podcast" className="cta">
                Escuchar ahora
              </Link>
            </article>
            <article className="feature-card">
              <h3>Radio streaming</h3>
              <p className="hero-subtitle">
                Transmisiones en vivo con agenda comunitaria.
              </p>
              <Link href="/radio-streaming" className="cta">
                Entrar al vivo
              </Link>
            </article>
            <article className="feature-card">
              <h3>Club de lectura</h3>
              <p className="hero-subtitle">
                Novela del mes, poesía y encuentros compartidos.
              </p>
              <Link href="/club-lectura" className="cta">
                Ver lecturas
              </Link>
            </article>
          </div>
        </section>

        <section className="about-strip" aria-labelledby="sobre-nosotras">
          <h2 className="section-title" id="sobre-nosotras">
            Sobre nosotras
          </h2>
          <p className="hero-subtitle">
            Somos un grupo de mujeres que crea espacios de diálogo, acompañamiento
            y aprendizaje. Queremos que esta página sea un lugar simple y
            accesible para compartir todo lo que hacemos.
          </p>
        </section>

        <section className="section" aria-labelledby="equipo">
          <h2 className="section-title" id="equipo">
            Nuestro equipo
          </h2>
          <div className="team-grid">
            <article className="team-card">
              <Image
                src="/foto-1.jpg"
                alt="Foto de Mariana Sosa"
                width={180}
                height={180}
                className="team-photo"
              />
              <div>
                <h3 className="post-title">Mariana Sosa</h3>
                <p className="hero-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </article>
            <article className="team-card">
              <Image
                src="/foto-2.jpg"
                alt="Foto de Lucía Pérez"
                width={180}
                height={180}
                className="team-photo"
              />
              <div>
                <h3 className="post-title">Lucía Pérez</h3>
                <p className="hero-subtitle">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="cta-strip" aria-labelledby="sumate">
          <div>
            <h2 className="section-title" id="sumate">
              Sumate a la comunidad
            </h2>
            <p className="hero-subtitle">
              Recibí noticias, agenda y novedades del programa de radio.
            </p>
          </div>
          <form className="cta-form" aria-label="Formulario de novedades">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              placeholder="tuemail@correo.com"
              required
            />
            <button className="cta" type="submit">
              Quiero recibir novedades
            </button>
          </form>
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
