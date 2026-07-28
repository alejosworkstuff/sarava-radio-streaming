import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD")
  .refine(
    (value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)),
    { message: "date must be a valid calendar date" },
  );

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case");

export const postSchema = z.object({
  title: z.string().min(1, "title is required"),
  author: z.string().min(1, "author is required"),
  date: isoDate,
  displayDate: z.string().min(1, "displayDate is required"),
  excerpt: z.string().min(1, "excerpt is required"),
  tags: z.array(z.string().min(1)).min(1, "tags must have at least one entry"),
  image: z.string(),
  featured: z.boolean().default(false),
});

export const novelSchema = z.object({
  title: z.string().min(1, "title is required"),
  coverImage: z.string().min(1, "coverImage is required"),
  description: z.string().min(1, "description is required"),
  active: z.boolean(),
});

export const eventSchema = z.object({
  title: z.string().min(1, "title is required"),
  date: isoDate,
  displayDate: z.string().min(1, "displayDate is required"),
  summary: z.string().min(1, "summary is required"),
  schedule: z.string().min(1, "schedule is required"),
  ctaLabel: z.string().min(1, "ctaLabel is required"),
  ctaHref: z.string().url("ctaHref must be a valid URL"),
  category: z.string().min(1, "category is required"),
  featured: z.boolean(),
});

export const podcastEpisodeSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  date: isoDate,
  displayDate: z.string().min(1, "displayDate is required"),
  spotifyUrl: z.string().url("spotifyUrl must be a valid URL"),
});

export const aboutSchema = z.object({
  highlights: z
    .array(
      z.object({
        title: z.string().min(1, "title is required"),
        description: z.string().min(1, "description is required"),
        href: z.string().min(1, "href is required"),
        cta: z.string().min(1, "cta is required"),
      }),
    )
    .min(1, "highlights must have at least one entry"),
  paragraphs: z
    .array(z.string().min(1))
    .min(1, "paragraphs must have at least one entry"),
  team: z
    .array(
      z.object({
        name: z.string().min(1, "name is required"),
        image: z.string().min(1, "image is required"),
        alt: z.string().min(1, "alt is required"),
        bio: z.string().min(1, "bio is required"),
      }),
    )
    .min(1, "team must have at least one entry"),
});

export { slug };
