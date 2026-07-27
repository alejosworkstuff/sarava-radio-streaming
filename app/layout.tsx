import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { rootMetadata } from "@/lib/site-metadata";

/** CMS content is DB-backed; always render on demand. */
export const dynamic = "force-dynamic";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
