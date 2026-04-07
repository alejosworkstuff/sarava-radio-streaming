import { SiteFooter, SiteHeader } from "./components/site-shell";
import HeroBanner from "./components/hero-banner";

export default async function Home() {
  return (
    <div className="page">
      <SiteHeader
        pill="Espacio Cultural Sarava"
        title="Un lugar para compartir voces"
        home
      />

      <main>
        <HeroBanner />
      </main>

      <SiteFooter home />
    </div>
  );
}
