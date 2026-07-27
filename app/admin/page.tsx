import Link from "next/link";
import { prisma } from "@/lib/db";

const sections = [
  {
    href: "/admin/posts",
    title: "Posts",
    description: "Publicaciones del espacio cultural.",
    countKey: "posts" as const,
  },
  {
    href: "/admin/events",
    title: "Eventos",
    description: "Transmisiones, talleres y encuentros.",
    countKey: "events" as const,
  },
  {
    href: "/admin/novels",
    title: "Novelas",
    description: "Club de lectura y novela del mes.",
    countKey: "novels" as const,
  },
  {
    href: "/admin/about",
    title: "Sobre nosotras",
    description: "Textos del equipo y la presentación del espacio.",
    countKey: null,
  },
] as const;

export default async function AdminHomePage() {
  const [posts, events, novels] = await Promise.all([
    prisma.post.count(),
    prisma.event.count(),
    prisma.novel.count(),
  ]);

  const counts = { posts, events, novels };

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Panel</p>
        <h1>Gestión de contenido</h1>
        <p>
          Creá, editá y publicá desde acá. Los cambios aparecen en el sitio
          público.
        </p>
      </header>

      <div className="admin-grid">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="admin-card">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {section.countKey ? (
              <p className="admin-item-meta">{counts[section.countKey]} ítems</p>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
