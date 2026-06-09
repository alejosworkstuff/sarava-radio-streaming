import { ClubLecturaSection } from "../components/club-lectura-section";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getNovelOfTheMonth, getNovels } from "@/lib/content";

export default async function ClubLecturaPage() {
  const novels = await getNovels();
  const novel = await getNovelOfTheMonth();
  const archive = novels.filter((entry) => !entry.active);

  return (
    <div className="page">
      <SiteHeader pill="Club de lectura Saravá" title="Espacio Cultural Sarava" />

      <main className="grid grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] gap-12 lg:gap-16 max-w-7xl mx-auto p-8 lg:p-12">
        <ClubLecturaSection novel={novel ?? null} archive={archive} />
      </main>

      <SiteFooter />
    </div>
  );
}
