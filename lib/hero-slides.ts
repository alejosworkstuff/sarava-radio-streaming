import type { NovelEntry, PostEntry } from "./content";

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
};

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: "fallback-novel",
    title: "Club de lectura Saravá",
    subtitle: "Novela del mes",
    description:
      "Descubrí la lectura destacada del mes en nuestro club de lectura.",
    image: "/club-lectura-las-indignas.png",
    link: "/club-lectura",
  },
  {
    id: "fallback-cultural-1",
    title: "Espacio Cultural",
    subtitle: "Noticias y novedades",
    description:
      "Talleres, encuentros y actividades del proyecto Saravá.",
    image: "/foto-1.jpg",
    link: "/espacio-cultural",
  },
  {
    id: "fallback-cultural-2",
    title: "Comunidad Saravá",
    subtitle: "Espacio Cultural",
    description: "Seguí las publicaciones y eventos de nuestra comunidad.",
    image: "/foto-2.jpg",
    link: "/espacio-cultural",
  },
];

function excerpt(text: string, max = 180): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max).trim()}…`;
}

export function buildHeroSlides(
  posts: PostEntry[],
  novel?: NovelEntry | null,
): HeroSlide[] {
  const slides: HeroSlide[] = [];

  if (novel?.title) {
    slides.push({
      id: `novel-${novel.slug}`,
      title: novel.title,
      subtitle: "Novela del mes",
      description: excerpt(
        novel.description.split("\n\n")[0] ?? novel.description,
      ),
      image: novel.coverImage || "/club-lectura-las-indignas.png",
      link: "/club-lectura",
    });
  }

  for (const post of posts.slice(0, 2)) {
    slides.push({
      id: post.slug,
      title: post.title,
      subtitle: `${post.author} · Espacio Cultural`,
      description: excerpt(post.excerpt),
      image: post.image || "/foto-1.jpg",
      link: "/espacio-cultural",
    });
  }

  if (slides.length >= 3) {
    return slides.slice(0, 3);
  }

  const padded = [...slides];
  for (const fallback of FALLBACK_SLIDES) {
    if (padded.length >= 3) {
      break;
    }
    if (!padded.some((slide) => slide.id === fallback.id)) {
      padded.push(fallback);
    }
  }

  return padded.slice(0, 3);
}

export function resolvePublicAssetSrc(value: string, basePath = ""): string {
  if (!value) {
    return "";
  }
  if (
    value.startsWith("http") ||
    value.startsWith("data:") ||
    value.startsWith(`${basePath}/`)
  ) {
    return value;
  }
  return `${basePath}${value.startsWith("/") ? value : `/${value}`}`;
}
