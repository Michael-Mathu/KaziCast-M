import { PrismaClient } from "@prisma/client";

// ponytail: global singleton to avoid hot-reload connection leaks in Next.js dev
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
