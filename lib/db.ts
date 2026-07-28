import "server-only";

import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaSchemaStamp: string | undefined;
};

/** Bump when Comment/schema fields change so hot reload drops a stale client. */
const PRISMA_SCHEMA_STAMP = "comment-pageKey-v1";

/** Keep current pg TLS behavior without the sslmode=require deprecation warning. */
export function normalizeDatabaseUrl(connectionString: string): string {
  return connectionString.replace(
    /([?&]sslmode=)(require|prefer|verify-ca)\b/i,
    "$1verify-full",
  );
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaPg({
    connectionString: normalizeDatabaseUrl(connectionString),
  });
  return new PrismaClient({ adapter });
}

function getPrismaClient() {
  if (
    !globalForPrisma.prisma ||
    globalForPrisma.prismaSchemaStamp !== PRISMA_SCHEMA_STAMP
  ) {
    globalForPrisma.prisma = createPrismaClient();
    globalForPrisma.prismaSchemaStamp = PRISMA_SCHEMA_STAMP;
  }
  return globalForPrisma.prisma;
}

/** Lazy proxy so importing this module during `next build` does not require DB. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
