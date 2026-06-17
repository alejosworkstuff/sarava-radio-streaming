import type { Metadata } from "next";
import HeroBanner from "./components/hero-banner";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { getNovelOfTheMonth, getPosts } from "@/lib/content";
import { buildHeroSlides } from "@/lib/hero-slides";
import { buildPageMetadata } from "@/lib/site-metadata";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "Un lugar para compartir voces",
    description:
      "Portada del Espacio Cultural Saravá: noticias, radio en vivo, club de lectura y actividades comunitarias en Bolívar, Buenos Aires.",
    path: "/",
  });
}

export default async function Home() {
  const [posts, novel] = await Promise.all([getPosts(), getNovelOfTheMonth()]);
  const slides = buildHeroSlides(posts, novel);

  return (
    <div className="page">
      <SiteHeader
        pill="Espacio Cultural Sarava"
        title="Un lugar para compartir voces"
        home
      />

      <main>
        <HeroBanner slides={slides} />
      </main>

      <SiteFooter home />
    </div>
  );
}
