import "./globals.css";
import { rootMetadata } from "@/lib/site-metadata";

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
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
