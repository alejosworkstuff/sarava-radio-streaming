import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centro Cultural Saravá",
  description:
    "Noticias, radio y actividades del Centro Cultural Saravá. Un espacio comunitario para compartir voces y encuentros.",
};

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