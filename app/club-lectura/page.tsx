import Image from "next/image";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export default function ClubLecturaPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
          <div className="post-list">
            <article className="post-card">
              <div className="book-feature">
                <Image
                  src={`${basePath}/club-lectura-las-indignas.png`}
                  alt="Portada de Las indignas"
                  width={720}
                  height={960}
                  className="book-cover"
                />
                <div className="book-copy">
                  <div className="post-excerpt">
                    <p>
                      En un mundo arrasado por catástrofes y contaminación, un
                      grupo de mujeres habita la Casa de la Hermandad Sagrada,
                      aislada del resto de la humanidad. Allí todo está regido
                      por la palabra de la Hermana Superior y por la presencia
                      omnipotente de <strong>El</strong>, una figura divina tan
                      temida como inescrutable.
                    </p>
                    <p>
                      Clasificadas en castas, sometidas a mutilaciones,
                      castigos y rituales de purificación, las mujeres aprenden
                      que el dolor es la única forma de expiación. Las indignas
                      ocupan el último escalón: son las impuras, las
                      desechables, las que cargan sobre el cuerpo y la memoria
                      el peso de todas las culpas.
                    </p>
                    <p>
                      Pero, incluso ahí, en el corazón de la obediencia y el
                      fanatismo, algo se resquebraja. Una de ellas comienza a
                      escribir en secreto, a registrar lo que nadie debería
                      nombrar, a trazar con palabras una fisura en el mandato de
                      la fe. En medio de la violencia, la amistad, la ternura y
                      la rebeldía mínima se vuelven formas de resistencia.
                    </p>
                    <p>
                      Con la potencia inquietante de <em>Cadáver exquisito</em>,
                      Agustina Bazterrica construye una distopía feroz donde el
                      cuerpo de las mujeres es territorio de guerra y la
                      devoción, un dispositivo de control. <em>Las indignas</em>{" "}
                      es un relato oscuro y luminoso a la vez, que pregunta
                      hasta dónde puede llegar la crueldad humana y qué migajas
                      de libertad todavía pueden defenderse cuando todo parece
                      perdido.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
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