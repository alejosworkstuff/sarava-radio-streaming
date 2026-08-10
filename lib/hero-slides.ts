import type { NovelEntry, EventEntry } from "./content-types";
import type { PostEntry } from "./post-types";

export type HeroSlide = {
  id: string;
  title: string;
  /** Publisher / byline shown especially on text-only slides. */
  author: string;
  subtitle: string;
  description: string;
  image: string | null;
  hasImage: boolean;
  link: string;
};

/** Soft cap so the carousel stays usable if many items are featured. */
const MAX_SLIDES = 8;

const PREVIEW_THRESHOLD = 100;
const PREVIEW_MAX = 180;

function hasRealImage(value: string | null | undefined): boolean {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return false;
  // Ignore legacy stock fillers sometimes used as placeholders.
  if (trimmed === "/foto-1.jpg" || trimmed === "/foto-2.jpg") return false;
  return true;
}

/**
 * < 100 chars → show full text.
 * ≥ 100 chars → truncated preview.
 */
export function heroBodyText(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length < PREVIEW_THRESHOLD) {
    return trimmed;
  }
  if (trimmed.length <= PREVIEW_MAX) {
    return trimmed;
  }
  return `${trimmed.slice(0, PREVIEW_MAX).trim()}…`;
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
  const image = hasRealImage(post.image) ? post.image.trim() : null;
  return {
    id: `post-${post.slug}`,
    title: post.title,
    author: post.author,
    subtitle: "Espacio Cultural",
    description: heroBodyText(post.excerpt),
    image,
    hasImage: Boolean(image),
    link: `/espacio-cultural/${post.slug}`,
  };
}

function eventToSlide(event: EventEntry, logoUrl = "/logo.jpg"): HeroSlide {
  const image =
    event.category === "radio" && hasRealImage(logoUrl) ? logoUrl : null;
  return {
    id: `event-${event.slug}`,
    title: event.title,
    author: "Saravá",
    subtitle: eventSubtitle(event),
    description: heroBodyText(event.summary),
    image,
    hasImage: Boolean(image),
    link: eventLink(event),
  };
}

function novelToSlide(novel: NovelEntry): HeroSlide {
  const image = hasRealImage(novel.coverImage) ? novel.coverImage.trim() : null;
  return {
    id: `novel-${novel.slug}`,
    title: novel.title,
    author: "Club de lectura",
    subtitle: "Novela del mes",
    description: heroBodyText(
      novel.description.split("\n\n")[0] ?? novel.description,
    ),
    image,
    hasImage: Boolean(image),
    link: "/club-lectura",
  };
}

type DatedCandidate = {
  date: string;
  slide: HeroSlide;
};

export function buildHeroSlides(
  posts: PostEntry[],
  events: EventEntry[] = [],
  novel?: NovelEntry | null,
  logoUrl = "/logo.jpg",
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
      .map((event) => ({
        date: event.date,
        slide: eventToSlide(event, logoUrl),
      })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  for (const item of featured) {
    push(item.slide);
  }

  // Novel only if explicitly marked active (destacada / novela del mes).
  if (novel?.active && novel.title) {
    push(novelToSlide(novel));
  }

  return slides;
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
