import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAllowedAdminEmail } from "@/lib/admin-auth";

const nav = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/events", label: "Eventos" },
  { href: "/admin/novels", label: "Novelas" },
  { href: "/admin/about", label: "Sobre nosotras" },
  { href: "/admin/comments", label: "Comentarios" },
  { href: "/admin/settings", label: "Logo" },
] as const;

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in?redirect_url=/admin");
  }

  const userEmail = user.emailAddresses[0]?.emailAddress?.toLowerCase();

  if (!isAllowedAdminEmail(userEmail)) {
    return (
      <main className="admin-auth">
        <div className="admin-auth-card">
          <h1 className="admin-auth-title">Sin acceso</h1>
          <p className="admin-auth-copy">
            Esta cuenta no está autorizada para gestionar Saravá. Usá un correo
            de administración autorizado.
          </p>
          <Link href="/" className="pill nav-btn">
            Volver al sitio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand-row">
            <Link href="/admin" className="admin-brand">
              Saravá Admin
            </Link>
            <nav className="admin-nav" aria-label="Panel de gestión">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="admin-nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="admin-header-actions">
            <Link href="/" className="admin-site-link">
              Ver sitio
            </Link>
            <UserButton />
          </div>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}
