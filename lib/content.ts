import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");

type BaseEntry = {
  slug: string;
};

export type PostEntry = BaseEntry & {
  title: string;
  author: string;
  date: string;
  displayDate: string;
  excerpt: string;
  tags: string[];
  image: string;
};

export type NovelEntry = BaseEntry & {
  title: string;
  coverImage: string;
  description: string;
  active: boolean;
};

export type EventEntry = BaseEntry & {
  title: string;
  date: string;
  displayDate: string;
  summary: string;
  schedule: string;
  ctaLabel: string;
  ctaHref: string;
  category: string;
  featured: boolean;
};

async function readCollection<T>(collection: string): Promise<(T & BaseEntry)[]> {
  const folder = path.join(contentRoot, collection);
  const files = (await fs.readdir(folder)).filter((file) => file.endsWith(".json"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(folder, file);
      const raw = await fs.readFile(filePath, "utf-8");

      return {
        slug: file.replace(/\.json$/, ""),
        ...(JSON.parse(raw) as T),
      };
    }),
  );

  return entries;
}

export async function getPosts() {
  const posts = await readCollection<Omit<PostEntry, "slug">>("posts");
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEvents() {
  const events = await readCollection<Omit<EventEntry, "slug">>("events");
  return events.sort((a, b) => a.date.localeCompare(b.date));
}

export async function getFeaturedEvent(category?: string) {
  const events = await getEvents();
  return events.find(
    (event) => event.featured && (!category || event.category === category),
  );
}

export async function getNovelOfTheMonth() {
  const novels = await readCollection<Omit<NovelEntry, "slug">>("novels");
  return novels.find((novel) => novel.active) ?? novels[0];
}
