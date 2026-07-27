import type { Metadata } from "next";

export const SITE_NAME = "Espacio Cultural Saravá";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const DEFAULT_DESCRIPTION =
  "Noticias, radio, podcast y actividades del Centro Cultural Saravá. Un espacio comunitario para compartir voces y encuentros en Bolívar, Buenos Aires.";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/logo.jpg",
        alt: "Logo del Espacio Cultural Saravá",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ["/logo.jpg"],
  },
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/logo.jpg",
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.endsWith("/") ? path : `${path}/`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
  };
}
