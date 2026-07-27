import "dotenv/config";
import { promises as fs } from "node:fs";
import path from "node:path";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  aboutSchema,
  eventSchema,
  novelSchema,
  postSchema,
} from "../lib/content-schemas";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: connectionString.replace(
      /([?&]sslmode=)(require|prefer|verify-ca)\b/i,
      "$1verify-full",
    ),
  }),
});

const contentRoot = path.join(process.cwd(), "content");

async function readJsonFiles(collection: string) {
  const folder = path.join(contentRoot, collection);
  const files = (await fs.readdir(folder)).filter((file) => file.endsWith(".json"));

  return Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(folder, file), "utf-8");
      return {
        slug: file.replace(/\.json$/, ""),
        data: JSON.parse(raw) as unknown,
      };
    }),
  );
}

async function main() {
  const posts = await readJsonFiles("posts");
  for (const entry of posts) {
    const data = postSchema.parse(entry.data);
    await prisma.post.upsert({
      where: { slug: entry.slug },
      create: {
        slug: entry.slug,
        title: data.title,
        author: data.author,
        date: new Date(`${data.date}T00:00:00.000Z`),
        displayDate: data.displayDate,
        excerpt: data.excerpt,
        tags: data.tags,
        image: data.image,
        featured: data.featured,
        published: true,
      },
      update: {
        title: data.title,
        author: data.author,
        date: new Date(`${data.date}T00:00:00.000Z`),
        displayDate: data.displayDate,
        excerpt: data.excerpt,
        tags: data.tags,
        image: data.image,
        featured: data.featured,
        published: true,
      },
    });
  }

  const events = await readJsonFiles("events");
  for (const entry of events) {
    const data = eventSchema.parse(entry.data);
    await prisma.event.upsert({
      where: { slug: entry.slug },
      create: {
        slug: entry.slug,
        title: data.title,
        date: new Date(`${data.date}T00:00:00.000Z`),
        displayDate: data.displayDate,
        summary: data.summary,
        schedule: data.schedule,
        ctaLabel: data.ctaLabel,
        ctaHref: data.ctaHref,
        category: data.category,
        featured: data.featured,
        published: true,
      },
      update: {
        title: data.title,
        date: new Date(`${data.date}T00:00:00.000Z`),
        displayDate: data.displayDate,
        summary: data.summary,
        schedule: data.schedule,
        ctaLabel: data.ctaLabel,
        ctaHref: data.ctaHref,
        category: data.category,
        featured: data.featured,
        published: true,
      },
    });
  }

  const novels = await readJsonFiles("novels");
  for (const entry of novels) {
    const data = novelSchema.parse(entry.data);
    await prisma.novel.upsert({
      where: { slug: entry.slug },
      create: {
        slug: entry.slug,
        title: data.title,
        coverImage: data.coverImage,
        description: data.description,
        active: data.active,
        published: true,
      },
      update: {
        title: data.title,
        coverImage: data.coverImage,
        description: data.description,
        active: data.active,
        published: true,
      },
    });
  }

  const aboutRaw = JSON.parse(
    await fs.readFile(path.join(contentRoot, "about.json"), "utf-8"),
  ) as unknown;
  const about = aboutSchema.parse(aboutRaw);

  await prisma.about.upsert({
    where: { id: "about" },
    create: {
      id: "about",
      highlights: about.highlights,
      paragraphs: about.paragraphs,
      team: about.team,
    },
    update: {
      highlights: about.highlights,
      paragraphs: about.paragraphs,
      team: about.team,
    },
  });

  console.log(
    `Seeded ${posts.length} posts, ${events.length} events, ${novels.length} novels, about=1`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
