import type { Metadata } from "next";
import { ClubLecturaSection } from "../components/club-lectura-section";
import { Comments } from "../components/comments";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getNovelOfTheMonth, getNovels } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site-metadata";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "Club de lectura",
    description:
      "Novela del mes, poesía y encuentros compartidos del club de lectura Saravá. Lecturas comunitarias y archivo de novelas anteriores.",
    path: "/club-lectura",
  });
}

export default async function ClubLecturaPage() {
  const novels = await getNovels();
  const novel = await getNovelOfTheMonth();
  const archive = novels.filter((entry) => !entry.active);

  return (
    <div className="page">
      <SiteHeader title="Espacio Cultural Sarava" />

      <main className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-12 lg:gap-16 max-w-7xl mx-auto p-8 lg:p-12">
        <div>
          <ClubLecturaSection novel={novel ?? null} archive={archive} />
          {novel?.active ? <Comments novelId={novel.id} /> : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
