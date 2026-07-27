import type { NovelEntry, EventEntry } from "./content-types";
import type { PostEntry } from "./post-types";

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
    image: "/club-lectura-las-indignas.webp",
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

const MAX_SLIDES = 3;

function excerpt(text: string, max = 180): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max).trim()}…`;
}

function eventImage(category: string): string {
  if (category === "radio") {
    return "/logo.jpg";
  }
  return "/foto-2.jpg";
}

function eventLink(event: EventEntry): string {
  if (event.category === "radio") {
    return "/radio-streaming";
  }
  return event.ctaHref;
}

function eventSubtitle(event: EventEntry): string {
  if (event.category === "radio") {
    return "Radio streaming";
  }
  return event.displayDate || "Evento";
}

function postToSlide(post: PostEntry): HeroSlide {
  return {
    id: `post-${post.slug}`,
    title: post.title,
    subtitle: `${post.author} · Espacio Cultural`,
    description: excerpt(post.excerpt),
    image: post.image || "/foto-1.jpg",
    link: `/espacio-cultural/${post.slug}`,
  };
}

function eventToSlide(event: EventEntry): HeroSlide {
  return {
    id: `event-${event.slug}`,
    title: event.title,
    subtitle: eventSubtitle(event),
    description: excerpt(event.summary),
    image: eventImage(event.category),
    link: eventLink(event),
  };
}

function novelToSlide(novel: NovelEntry): HeroSlide {
  return {
    id: `novel-${novel.slug}`,
    title: novel.title,
    subtitle: "Novela del mes",
    description: excerpt(
      novel.description.split("\n\n")[0] ?? novel.description,
    ),
    image: novel.coverImage || "/club-lectura-las-indignas.webp",
    link: "/club-lectura",
  };
}

type DatedCandidate = {
  date: string;
  slide: HeroSlide;
};

/**
 * Hero priority:
 * 1. Featured posts + featured events (newest first)
 * 2. Novela del mes (if room)
 * 3. Latest non-featured posts
 * 4. Static fallbacks
 */
export function buildHeroSlides(
  posts: PostEntry[],
  events: EventEntry[] = [],
  novel?: NovelEntry | null,
): HeroSlide[] {
  const slides: HeroSlide[] = [];
  const usedIds = new Set<string>();

  const push = (slide: HeroSlide) => {
    if (slides.length >= MAX_SLIDES || usedIds.has(slide.id)) {
      return;
    }
    usedIds.add(slide.id);
    slides.push(slide);
  };

  const featured: DatedCandidate[] = [
    ...posts
      .filter((post) => post.featured)
      .map((post) => ({ date: post.date, slide: postToSlide(post) })),
    ...events
      .filter((event) => event.featured)
      .map((event) => ({ date: event.date, slide: eventToSlide(event) })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  for (const item of featured) {
    push(item.slide);
  }

  if (novel?.title) {
    push(novelToSlide(novel));
  }

  for (const post of posts.filter((p) => !p.featured)) {
    push(postToSlide(post));
  }

  for (const fallback of FALLBACK_SLIDES) {
    push(fallback);
  }

  return slides.slice(0, MAX_SLIDES);
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
