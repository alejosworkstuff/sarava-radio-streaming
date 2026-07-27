import type { Metadata } from "next";
import HeroBanner from "./components/hero-banner";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { getEvents, getLogoUrl, getNovelOfTheMonth, getPosts } from "@/lib/content";
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
  const [posts, events, novel, logoUrl] = await Promise.all([
    getPosts(),
    getEvents(),
    getNovelOfTheMonth(),
    getLogoUrl(),
  ]);
  const slides = buildHeroSlides(posts, events, novel, logoUrl);

  return (
    <div className="page">
      <SiteHeader
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
