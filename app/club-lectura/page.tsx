import Image from "next/image";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getNovelOfTheMonth } from "../../lib/content";

export default async function ClubLecturaPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const novel = await getNovelOfTheMonth();

  return (
    <div className="page">
      <SiteHeader pill="Club de lectura Saravá" title="Centro Cultural Saravá" />

      <main>
        <section className="section">
          <h2 className="section-title">La novela del mes</h2>
          <p className="hero-subtitle">
            Espacio para compartir lecturas, fragmentos y encuentros alrededor
            de la novela elegida.
          </p>
          {novel ? (
            <div className="post-list">
              <article className="post-card">
                <div className="book-feature">
                  <Image
                    src={`${basePath}${novel.coverImage}`}
                    alt={`Portada de ${novel.title}`}
                    width={720}
                    height={960}
                    className="book-cover"
                  />
                  <div className="book-copy">
                    <div className="post-excerpt">
                      {novel.description.split("\n\n").map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : null}
        </section>

        <section className="section">
          <h2 className="section-title">Poesía</h2>
          <p className="hero-subtitle">
            Recomendaciones, lectura en voz alta y textos para compartir en
            comunidad.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
