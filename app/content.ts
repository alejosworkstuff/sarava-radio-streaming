export type CulturalPost = {
  author: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  image: string;
};

export const culturalPosts: CulturalPost[] = [
  {
    author: "Mariana Sosa",
    date: "12 de marzo, 2026",
    title: "Taller abierto de expresión oral",
    excerpt:
      "Un encuentro para compartir la voz, perder el miedo escénico y construir confianza en comunidad.",
    tags: ["Comunidad", "Agenda"],
    image: "/foto-1.jpg",
  },
  {
    author: "Lucía Pérez",
    date: "5 de marzo, 2026",
    title: "Encuentro cultural de fin de semana",
    excerpt:
      "Una jornada con lectura, música y conversación para seguir tejiendo redes entre vecinas, artistas y curiosas.",
    tags: ["Cultura", "Historias"],
    image: "/foto-2.jpg",
  },
];