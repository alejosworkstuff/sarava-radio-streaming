import Image from "next/image";
import Link from "next/link";
import {
  aboutHighlights,
  aboutParagraphs,
  teamMembers,
} from "../about-content";
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
              Tu espacio comunitario para estar al día y acompañadx.
            </h2>
            <p className="hero-subtitle">
              Somos un colectivo de personas que comparte noticias, encuentros y
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
            {aboutHighlights.map((item) => (
              <article className="feature-card" key={item.href}>
                <h3>{item.title}</h3>
                <p className="hero-subtitle">{item.description}</p>
                <Link href={item.href} className="cta">
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="about-strip" aria-labelledby="sobre-nosotrxs">
          <h2 className="section-title" id="sobre-nosotrxs">
            Sobre nosotrxs
          </h2>
          <div className="hero-subtitle">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="equipo">
          <h2 className="section-title" id="equipo">
            Nuestro equipo
          </h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <article className="team-card" key={member.name}>
                <Image
                  src={`${basePath}${member.image}`}
                  alt={member.alt}
                  width={180}
                  height={180}
                  className="team-photo"
                />
                <div>
                  <h3 className="post-title">{member.name}</h3>
                  <p className="hero-subtitle">{member.bio}</p>
                </div>
              </article>
            ))}
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
