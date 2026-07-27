import "server-only";

import { auth, currentUser } from "@clerk/nextjs/server";

export type AdminAuthResult =
  | { ok: true; email: string; clerkId: string }
  | { ok: false; error: string };

function parseAllowedEmails(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .replace(/^["']|["']$/g, "")
    .split(",")
    .map((email) => email.trim().replace(/^["']|["']$/g, "").toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allowed = parseAllowedEmails(process.env.ADMIN_EMAIL);
  if (allowed.length === 0) return true;
  return allowed.includes(email.trim().toLowerCase());
}

export async function requireAdmin(): Promise<AdminAuthResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "No autenticado" };
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) {
    return { ok: false, error: "Usuario sin email" };
  }

  if (!isAllowedAdminEmail(email)) {
    return { ok: false, error: "Sin permisos de administración" };
  }

  return { ok: true, email, clerkId: userId };
}
