import { promises as fs } from "node:fs";
import path from "node:path";
import type { ZodType } from "zod";
import {
  eventSchema,
  novelSchema,
  podcastEpisodeSchema,
  postSchema,
  slug,
} from "../lib/content-schemas";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");

type CollectionConfig = {
  folder: string;
  schema: ZodType;
  imageFields?: string[];
};

const collections: CollectionConfig[] = [
  { folder: "posts", schema: postSchema, imageFields: ["image"] },
  { folder: "novels", schema: novelSchema, imageFields: ["coverImage"] },
  { folder: "events", schema: eventSchema },
];

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function validateCollection({
  folder,
  schema,
  imageFields = [],
}: CollectionConfig): Promise<string[]> {
  const dir = path.join(contentRoot, folder);

  if (!(await pathExists(dir))) {
    return [`${folder}/: directory not found`];
  }

  const files = (await fs.readdir(dir)).filter((file) => file.endsWith(".json"));
  const errors: string[] = [];

  for (const file of files) {
    const label = `${folder}/${file}`;
    const fileSlug = file.replace(/\.json$/, "");
    const slugResult = slug.safeParse(fileSlug);

    if (!slugResult.success) {
      errors.push(`${label}: filename slug "${fileSlug}" must be lowercase kebab-case`);
      continue;
    }

    const filePath = path.join(dir, file);
    let raw: unknown;

    try {
      raw = JSON.parse(await fs.readFile(filePath, "utf-8"));
    } catch {
      errors.push(`${label}: invalid JSON`);
      continue;
    }

    const result = schema.safeParse(raw);

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path.length > 0 ? issue.path.join(".") : "root";
        errors.push(`${label}: ${field}: ${issue.message}`);
      }
      continue;
    }

    for (const field of imageFields) {
      const value = (raw as Record<string, unknown>)[field];

      if (typeof value !== "string" || !value.startsWith("/")) {
        continue;
      }

      const assetPath = path.join(publicRoot, value.slice(1));

      if (!(await pathExists(assetPath))) {
        errors.push(`${label}: ${field} "${value}" not found in public/`);
      }
    }
  }

  return errors;
}

async function main() {
  const errors: string[] = [];

  for (const collection of collections) {
    errors.push(...(await validateCollection(collection)));
  }

  const podcastsDir = path.join(contentRoot, "podcasts");

  if (await pathExists(podcastsDir)) {
    errors.push(
      ...(await validateCollection({
        folder: "podcasts",
        schema: podcastEpisodeSchema,
      })),
    );
  }

  if (errors.length > 0) {
    console.error("Content validation failed:\n");

    for (const error of errors) {
      console.error(`  - ${error}`);
    }

    process.exit(1);
  }

  const counts = await Promise.all(
    collections.map(async ({ folder }) => {
      const dir = path.join(contentRoot, folder);
      const files = (await fs.readdir(dir)).filter((file) => file.endsWith(".json"));
      return `${files.length} ${folder}`;
    }),
  );

  console.log(`Content validation passed (${counts.join(", ")}).`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
