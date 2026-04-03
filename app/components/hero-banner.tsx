import Link from "next/link";
import { getNovelOfTheMonth } from "../../lib/content";

export default async function HeroBanner() {
  const novel = await getNovelOfTheMonth();

  return (
    <section className="hero-main">
      <div className="hero-main-content">
        <h1 className="hero-main-title">Bienvenidxs a Saravá</h1>
        <p className="hero-main-subtitle">
          Un centro cultural vivo donde las voces se encuentran, las historias se comparten y la comunidad florece.
        </p>
        <div className="cta-actions">
          <Link href="/espacio-cultural" className="cta cta-large">
            Leer publicaciones
          </Link>
          <Link href="/club-lectura" className="pill animate-novel-btn">
            Novela del mes
          </Link>
        </div>
      </div>
      {novel && (
        <div className="featured-novel">
          <img 
            src={novel.coverImage} 
            alt={novel.title}
            className="book-cover-large"
          />
          <div className="novel-info">
            <h3>Novela del mes</h3>
            <p>{novel.title}</p>
            <Link href={`/club-lectura/${novel.slug}`} className="pill animate-read-btn">
              Leer más
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

