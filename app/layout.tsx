import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { themeBootScript } from "@/lib/theme";
import { getLogoUrl } from "@/lib/content";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  rootMetadata,
} from "@/lib/site-metadata";

/** CMS content is DB-backed; always render on demand. */
export const dynamic = "force-dynamic";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const logoUrl = await getLogoUrl();
  return {
    ...rootMetadata,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      ...rootMetadata.openGraph,
      images: [
        {
          url: logoUrl,
          alt: `Logo del ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      ...rootMetadata.twitter,
      images: [logoUrl],
    },
    description: DEFAULT_DESCRIPTION,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        </head>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
