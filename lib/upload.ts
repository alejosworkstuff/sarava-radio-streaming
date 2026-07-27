import "server-only";

import { put } from "@vercel/blob";

const MAX_BYTES = 4.5 * 1024 * 1024; // keep under typical serverless body limits
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

export async function uploadPublicImage(
  file: File | null | undefined,
  folder: string,
): Promise<UploadResult | { ok: true; url: null }> {
  if (!file || file.size === 0) {
    return { ok: true, url: null };
  }

  if (!ALLOWED.has(file.type)) {
    return {
      ok: false,
      error: "Formato no permitido. Usá JPG, PNG, WEBP o GIF.",
    };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "La imagen supera 4.5 MB." };
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      error: "Falta BLOB_READ_WRITE_TOKEN. Configurá Vercel Blob.",
    };
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const pathname = `${folder}/${Date.now()}-${safeName}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return { ok: true, url: blob.url };
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

export function displayDateFromIso(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return `${day} de ${MONTHS_ES[month - 1]}, ${year}`;
}
