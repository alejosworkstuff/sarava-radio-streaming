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

/** Next.js recommended inline boot script (avoids React 19 script warning). */
function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
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
          <InlineScript html={themeBootScript} />
        </head>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
