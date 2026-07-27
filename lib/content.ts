import "server-only";

import type { PostEntry } from "./post-types";
import type { AboutContent, EventEntry, NovelEntry } from "./content-types";
import { prisma } from "./db";

export type { PostEntry } from "./post-types";
export type { AboutContent, EventEntry, NovelEntry } from "./content-types";

const DEFAULT_LOGO = "/logo.jpg";

function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: "site" } });
}

export async function getLogoUrl(): Promise<string> {
  const settings = await getSiteSettings();
  return settings?.logoUrl?.trim() || DEFAULT_LOGO;
}

export async function getPosts(): Promise<PostEntry[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    author: post.author,
    date: toIsoDate(post.date),
    displayDate: post.displayDate,
    excerpt: post.excerpt,
    tags: post.tags,
    image: post.image,
    featured: post.featured,
  }));
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
  });

  if (!post) return undefined;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    author: post.author,
    date: toIsoDate(post.date),
    displayDate: post.displayDate,
    excerpt: post.excerpt,
    tags: post.tags,
    image: post.image,
    featured: post.featured,
  } satisfies PostEntry;
}

export async function getEvents(): Promise<EventEntry[]> {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "asc" },
  });

  return events.map((event) => ({
    slug: event.slug,
    title: event.title,
    date: toIsoDate(event.date),
    displayDate: event.displayDate,
    summary: event.summary,
    schedule: event.schedule,
    ctaLabel: event.ctaLabel,
    ctaHref: event.ctaHref,
    category: event.category,
    featured: event.featured,
  }));
}

export async function getFeaturedEvent(category?: string) {
  const event = await prisma.event.findFirst({
    where: {
      published: true,
      featured: true,
      ...(category ? { category } : {}),
    },
    orderBy: { date: "asc" },
  });

  if (!event) return undefined;

  return {
    slug: event.slug,
    title: event.title,
    date: toIsoDate(event.date),
    displayDate: event.displayDate,
    summary: event.summary,
    schedule: event.schedule,
    ctaLabel: event.ctaLabel,
    ctaHref: event.ctaHref,
    category: event.category,
    featured: event.featured,
  } satisfies EventEntry;
}

export async function getNovels(): Promise<NovelEntry[]> {
  const novels = await prisma.novel.findMany({
    where: { published: true },
    orderBy: { title: "asc" },
  });

  return novels.map((novel) => ({
    id: novel.id,
    slug: novel.slug,
    title: novel.title,
    coverImage: novel.coverImage,
    description: novel.description,
    pdfUrl: novel.pdfUrl,
    active: novel.active,
  }));
}

export async function getNovelOfTheMonth() {
  const active = await prisma.novel.findFirst({
    where: { published: true, active: true },
  });

  if (active) {
    return {
      id: active.id,
      slug: active.slug,
      title: active.title,
      coverImage: active.coverImage,
      description: active.description,
      pdfUrl: active.pdfUrl,
      active: active.active,
    } satisfies NovelEntry;
  }

  const novels = await getNovels();
  return novels[0];
}

export async function getAbout(): Promise<AboutContent> {
  const about = await prisma.about.findUnique({ where: { id: "about" } });

  if (!about) {
    throw new Error("About content is missing. Run npm run db:seed.");
  }

  return {
    highlights: about.highlights as AboutContent["highlights"],
    paragraphs: about.paragraphs,
    team: about.team as AboutContent["team"],
  };
}
