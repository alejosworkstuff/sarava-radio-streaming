"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { displayDateFromIso, slugify, uploadPublicImage } from "@/lib/upload";
import { eventSchema, novelSchema, postSchema } from "@/lib/content-schemas";

export type ActionResult =
  | { ok: true; message?: string }
  | { ok: false; error: string };

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/espacio-cultural");
  revalidatePath("/radio-streaming");
  revalidatePath("/club-lectura");
  revalidatePath("/sobre-nosotras");
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  revalidatePath("/admin/events");
  revalidatePath("/admin/novels");
  revalidatePath("/admin/about");
}

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function formBool(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
) {
  const slug = slugify(base) || `item-${Date.now()}`;
  if (!(await exists(slug))) return slug;
  let i = 2;
  while (await exists(`${slug}-${i}`)) i += 1;
  return `${slug}-${i}`;
}

export async function createPostAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const title = formString(formData, "title");
  const author = formString(formData, "author");
  const date = formString(formData, "date");
  const excerpt = formString(formData, "excerpt");
  const tagsRaw = formString(formData, "tags");
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const displayDate =
    formString(formData, "displayDate") || displayDateFromIso(date);
  const published = formBool(formData, "published");

  const parsed = postSchema.safeParse({
    title,
    author,
    date,
    displayDate,
    excerpt,
    tags,
    image: "pending",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const upload = await uploadPublicImage(
    formData.get("image") as File | null,
    "posts",
  );
  if (!upload.ok) return upload;
  if (!upload.url) {
    return { ok: false, error: "La imagen es obligatoria para un post nuevo." };
  }

  const slug = await uniqueSlug(title, async (candidate) => {
    const found = await prisma.post.findUnique({ where: { slug: candidate } });
    return Boolean(found);
  });

  await prisma.post.create({
    data: {
      slug,
      title,
      author,
      date: new Date(`${date}T00:00:00.000Z`),
      displayDate,
      excerpt,
      tags,
      image: upload.url,
      published,
    },
  });

  revalidatePublic();
  revalidatePath(`/espacio-cultural/${slug}`);
  return { ok: true, message: "Post creado" };
}

export async function updatePostAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const id = formString(formData, "id");
  if (!id) return { ok: false, error: "Falta el id del post" };

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Post no encontrado" };

  const title = formString(formData, "title");
  const author = formString(formData, "author");
  const date = formString(formData, "date");
  const excerpt = formString(formData, "excerpt");
  const tags = formString(formData, "tags")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const displayDate =
    formString(formData, "displayDate") || displayDateFromIso(date);
  const published = formBool(formData, "published");

  const upload = await uploadPublicImage(
    formData.get("image") as File | null,
    "posts",
  );
  if (!upload.ok) return upload;

  const image = upload.url ?? existing.image;
  const parsed = postSchema.safeParse({
    title,
    author,
    date,
    displayDate,
    excerpt,
    tags,
    image,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.post.update({
    where: { id },
    data: {
      title,
      author,
      date: new Date(`${date}T00:00:00.000Z`),
      displayDate,
      excerpt,
      tags,
      image,
      published,
    },
  });

  revalidatePublic();
  revalidatePath(`/espacio-cultural/${existing.slug}`);
  return { ok: true, message: "Post actualizado" };
}

export async function deletePostAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const id = formString(formData, "id");
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Post no encontrado" };

  await prisma.post.delete({ where: { id } });
  revalidatePublic();
  revalidatePath(`/espacio-cultural/${existing.slug}`);
  return { ok: true, message: "Post eliminado" };
}

export async function createEventAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const title = formString(formData, "title");
  const date = formString(formData, "date");
  const displayDate =
    formString(formData, "displayDate") || displayDateFromIso(date);
  const summary = formString(formData, "summary");
  const schedule = formString(formData, "schedule");
  const ctaLabel = formString(formData, "ctaLabel");
  const ctaHref = formString(formData, "ctaHref");
  const category = formString(formData, "category") || "radio";
  const featured = formBool(formData, "featured");
  const published = formBool(formData, "published");

  const parsed = eventSchema.safeParse({
    title,
    date,
    displayDate,
    summary,
    schedule,
    ctaLabel,
    ctaHref,
    category,
    featured,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const slug = await uniqueSlug(title, async (candidate) => {
    const found = await prisma.event.findUnique({ where: { slug: candidate } });
    return Boolean(found);
  });

  await prisma.event.create({
    data: {
      slug,
      title,
      date: new Date(`${date}T00:00:00.000Z`),
      displayDate,
      summary,
      schedule,
      ctaLabel,
      ctaHref,
      category,
      featured,
      published,
    },
  });

  revalidatePublic();
  return { ok: true, message: "Evento creado" };
}

export async function updateEventAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const id = formString(formData, "id");
  const existing = await prisma.event.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Evento no encontrado" };

  const title = formString(formData, "title");
  const date = formString(formData, "date");
  const displayDate =
    formString(formData, "displayDate") || displayDateFromIso(date);
  const summary = formString(formData, "summary");
  const schedule = formString(formData, "schedule");
  const ctaLabel = formString(formData, "ctaLabel");
  const ctaHref = formString(formData, "ctaHref");
  const category = formString(formData, "category") || "radio";
  const featured = formBool(formData, "featured");
  const published = formBool(formData, "published");

  const parsed = eventSchema.safeParse({
    title,
    date,
    displayDate,
    summary,
    schedule,
    ctaLabel,
    ctaHref,
    category,
    featured,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.event.update({
    where: { id },
    data: {
      title,
      date: new Date(`${date}T00:00:00.000Z`),
      displayDate,
      summary,
      schedule,
      ctaLabel,
      ctaHref,
      category,
      featured,
      published,
    },
  });

  revalidatePublic();
  return { ok: true, message: "Evento actualizado" };
}

export async function deleteEventAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const id = formString(formData, "id");
  await prisma.event.delete({ where: { id } });
  revalidatePublic();
  return { ok: true, message: "Evento eliminado" };
}

export async function createNovelAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const title = formString(formData, "title");
  const description = formString(formData, "description");
  const active = formBool(formData, "active");
  const published = formBool(formData, "published");

  const upload = await uploadPublicImage(
    formData.get("coverImage") as File | null,
    "novels",
  );
  if (!upload.ok) return upload;
  if (!upload.url) {
    return { ok: false, error: "La tapa es obligatoria para una novela nueva." };
  }

  const parsed = novelSchema.safeParse({
    title,
    coverImage: upload.url,
    description,
    active,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  const slug = await uniqueSlug(title, async (candidate) => {
    const found = await prisma.novel.findUnique({ where: { slug: candidate } });
    return Boolean(found);
  });

  if (active) {
    await prisma.novel.updateMany({ data: { active: false } });
  }

  await prisma.novel.create({
    data: {
      slug,
      title,
      coverImage: upload.url,
      description,
      active,
      published,
    },
  });

  revalidatePublic();
  return { ok: true, message: "Novela creada" };
}

export async function updateNovelAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const id = formString(formData, "id");
  const existing = await prisma.novel.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Novela no encontrada" };

  const title = formString(formData, "title");
  const description = formString(formData, "description");
  const active = formBool(formData, "active");
  const published = formBool(formData, "published");

  const upload = await uploadPublicImage(
    formData.get("coverImage") as File | null,
    "novels",
  );
  if (!upload.ok) return upload;
  const coverImage = upload.url ?? existing.coverImage;

  const parsed = novelSchema.safeParse({
    title,
    coverImage,
    description,
    active,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  if (active) {
    await prisma.novel.updateMany({
      where: { NOT: { id } },
      data: { active: false },
    });
  }

  await prisma.novel.update({
    where: { id },
    data: { title, coverImage, description, active, published },
  });

  revalidatePublic();
  return { ok: true, message: "Novela actualizada" };
}

export async function deleteNovelAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const id = formString(formData, "id");
  await prisma.novel.delete({ where: { id } });
  revalidatePublic();
  return { ok: true, message: "Novela eliminada" };
}

const aboutUpdateSchema = z.object({
  paragraphs: z.array(z.string().min(1)).min(1),
  highlights: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        href: z.string().min(1),
        cta: z.string().min(1),
      }),
    )
    .min(1),
  team: z
    .array(
      z.object({
        name: z.string().min(1),
        image: z.string().min(1),
        alt: z.string().min(1),
        bio: z.string().min(1),
      }),
    )
    .min(1),
});

export async function updateAboutAction(formData: FormData): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin.ok) return { ok: false, error: admin.error };

  const paragraphs = formString(formData, "paragraphs")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  let highlights: unknown;
  let team: unknown;
  try {
    highlights = JSON.parse(formString(formData, "highlightsJson") || "[]");
    team = JSON.parse(formString(formData, "teamJson") || "[]");
  } catch {
    return { ok: false, error: "JSON inválido en highlights o team" };
  }

  const teamRows = Array.isArray(team) ? [...team] : [];
  for (let i = 0; i < teamRows.length; i += 1) {
    const upload = await uploadPublicImage(
      formData.get(`teamImage-${i}`) as File | null,
      "about",
    );
    if (!upload.ok) return upload;
    if (upload.url) {
      teamRows[i] = {
        ...(teamRows[i] as object),
        image: upload.url,
      };
    }
  }

  const parsed = aboutUpdateSchema.safeParse({
    paragraphs,
    highlights,
    team: teamRows,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" };
  }

  await prisma.about.upsert({
    where: { id: "about" },
    create: {
      id: "about",
      paragraphs: parsed.data.paragraphs,
      highlights: parsed.data.highlights,
      team: parsed.data.team,
    },
    update: {
      paragraphs: parsed.data.paragraphs,
      highlights: parsed.data.highlights,
      team: parsed.data.team,
    },
  });

  revalidatePublic();
  return { ok: true, message: "Sobre nosotras actualizado" };
}
