import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function SobreNosotrasPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="page">
      <SiteHeader pill="Sobre nosotrxs" title="Centro Cultural Saravá" />

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
              Episodio nuevo: &quot;Historias que nos sostienen&quot;.
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

        <section className="about-strip" aria-labelledby="sobre-nosotrxs">
          <h2 className="section-title" id="sobre-nosotrxs">
            Sobre nosotrxs
          </h2>
          <div className="hero-subtitle">
            <p>
              ¡Saravá! Una palabra de la tradición afro brasileña que significa
              bienvenida, buena suerte y que estés a salvo. Vinicius de Moraes
              la utilizó en muchas de sus composiciones para saludar o bendecir
              a sus amigos.
            </p>
            <p>
              Además de una hermosa palabra, Saravá es un proyecto cultural que
              pretende generar un abanico de propuestas, en torno a distintos
              lenguajes artísticos como la música, la literatura, el cine, el
              teatro, pero también a través de disciplinas que permiten difundir
              contenidos y reflexionar sobre diversas temáticas contemporáneas
              que nos movilizan.
            </p>
            <p>
              Sus inicios en la ciudad de Bolívar, provincia de Buenos Aires, se
              sitúan en el año 2021, en el contexto de la pandemia y durante el
              período de mayores restricciones a las actividades presenciales. En
              ese escenario, el proyecto surgió como un programa de
              radio-streaming con el propósito de sostener y enriquecer la oferta
              cultural local, frente a las limitaciones que las circunstancias
              imponían a los formatos tradicionales.
            </p>
            <p>
              Con el tiempo, advertimos que existía un potencial más allá del
              programa de radio y nos propusimos adentrarnos en propuestas que
              combinan lo presencial y lo virtual con el mismo sentido inicial:
              compartir lo que nos moviliza, lo que permite tejer redes, ampliar
              miradas, desafiar lugares comunes pivotando entre lo local y lo
              global gracias a las tecnologías digitales que nos invitan a ese
              juego, aunque con un fuerte acento en el latir de la Patria Grande.
            </p>
            <p>
              Saravá se define a partir de una mirada de género, de derechos
              humanos, decolonial y socioambiental, nutrida por el encuentro con
              las experiencias y las voces de personas y colectivos diversos.
            </p>
            <p>
              Les invitamos a conocer nuestro proyecto navegando por este sitio y
              siguiéndonos en nuestras redes sociales. ¡Saravá gente!
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="equipo">
          <h2 className="section-title" id="equipo">
            Nuestro equipo
          </h2>
          <div className="team-grid">
            <article className="team-card">
              <Image
                src={`${basePath}/foto-1.jpg`}
                alt="Foto de Mariana Sosa"
                width={180}
                height={180}
                className="team-photo"
              />
              <div>
                <h3 className="post-title">Mariana Sosa</h3>
                <p className="hero-subtitle">
                  Comunicadora y gestora cultural. Acompaña la producción de
                  contenidos, la agenda de actividades y los espacios de
                  encuentro del proyecto.
                </p>
              </div>
            </article>
            <article className="team-card">
              <Image
                src={`${basePath}/foto-2.jpg`}
                alt="Foto de Lucía Pérez"
                width={180}
                height={180}
                className="team-photo"
              />
              <div>
                <h3 className="post-title">Lucía Pérez</h3>
                <p className="hero-subtitle">
                  Coordinación editorial y acompañamiento de la comunidad.
                  Participa en la curaduría de temas, entrevistas y propuestas
                  para el club de lectura y el espacio cultural.
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
              Seguinos en redes para enterarte de la agenda, las novedades del
              programa y las próximas actividades.
            </p>
          </div>
          <div className="cta-actions" aria-label="Redes de Saravá">
            <a
              className="pill social-pill social-instagram"
              href="https://www.instagram.com/saravagente?igsh=MWU5M2dyNDBpcjh4cg=="
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              className="pill social-pill social-facebook"
              href="https://www.facebook.com/profile.php?id=100072438457481"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </section>
      </main>

      <SiteFooter home />
    </div>
  );
}