import Image from "next/image";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getNovelOfTheMonth } from "../../lib/content";

export default async function ClubLecturaPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const novel = await getNovelOfTheMonth();

  return (
    <div className="page">
      <SiteHeader pill="Club de lectura Saravá" title="Centro Cultural Saravá" />

      <main className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-12 lg:gap-16 max-w-7xl mx-auto p-8 lg:p-12">
        <section className="section lg:min-h-[32rem]">
          <h2 className="section-title mb-6">La novela del mes</h2>
          <p className="hero-subtitle mb-8 max-w-prose">
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
                      {novel.description.split("\n\n").map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : null}
        </section>

        <section className="section lg:sticky lg:top-24 lg:self-start lg:min-h-[32rem]">
          <h2 className="section-title mb-6">Poesía</h2>
          <p className="hero-subtitle mb-8">
            Recomendaciones, lectura en voz alta y textos para compartir en comunidad.
          </p>
          <div className="post-list">
            <article className="post-card">
              <div className="book-feature">
                {/* Placeholder for poetry image - replace src with future /poesia-cover.png */}
                <div className="book-cover h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-md flex items-center justify-center border shadow">
                  <span className="text-gray-500 text-sm font-medium">Agregar imagen<br/>poesía aquí</span>
                </div>
                <div className="book-copy">
                  <div className="post-excerpt">
                    {/* Placeholder for poetry description - edit future content/poesia.json */}
                    <p>Agregar descripción o fragmento de poesía aquí.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
