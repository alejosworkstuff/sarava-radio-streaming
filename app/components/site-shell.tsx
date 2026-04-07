import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/radio-streaming", label: "Saravá radio streaming" },
  { href: "/podcast", label: "Saravá Podcast" },
  { href: "/sobre-nosotras", label: "Sobre nosotrxs" },
  { href: "/club-lectura", label: "Club de lectura Saravá" },
  { href: "/espacio-cultural", label: "Saravá Espacio Cultural" },
] as const;

type SiteHeaderProps = {
  pill: string;
  title: string;
  home?: boolean;
};

export function SiteHeader({ pill, title, home = false }: SiteHeaderProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <header className={`site-header${home ? " site-header--home" : ""}`} style={{ borderBottom: 'none' }}>
      <div className="brand-nav">
        <div className="brand">
          <Image
            src={`${basePath}/logo.jpg`}
alt="Logo del Espacio Cultural Sarava"
            width={home ? 80 : 64}
            height={home ? 80 : 64}
            className="brand-logo"
            priority={home}
          />
          <div>
            {/* <p className="pill">{pill}</p> - Commented out to remove pill from SiteHeader */}
            <h1 className="brand-name">{title}</h1>
          </div>
        </div>
        {/* Original nav position - commented for revert:
        <nav className="nav-links" aria-label="Navegación principal">
          {!home && <Link href="/">Inicio</Link>}
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        */}
        <nav className="nav-links compact-nav" aria-label="Navegación principal">
          {!home && <Link href="/">Inicio</Link>}
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ home = false, hideSocial = false }: { home?: boolean; hideSocial?: boolean }) {
  return (
    <footer className="footer">
      {!hideSocial && (
        <div className="social-links" aria-label="Redes sociales">
          <a
            href="https://www.instagram.com/saravagente?igsh=MWU5M2dyNDBpcjh4cg=="
            target="_blank"
            rel="noreferrer"
            className="pill social-pill social-instagram"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100072438457481"
            target="_blank"
            rel="noreferrer"
            className="pill social-pill social-facebook"
          >
            Facebook
          </a>
        </div>
      )}
      {home ? (
        <p>San Carlos de Bolívar - Buenos Aires</p>
      ) : (
        <Link href="/" className="pill">
          Volver al inicio
        </Link>
      )}
    </footer>
  );
}
