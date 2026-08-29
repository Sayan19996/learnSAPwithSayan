// Lazily require @prisma/client to avoid build-time evaluation issues
const globalForPrisma = globalThis as any;

export function getPrisma() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { PrismaClient } = require("@prisma/client");

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}
