/* // lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; */

// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Create a global variable for Prisma client to persist across requests
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prisma Client instance for serverless
export const prisma =
  globalForPrisma.prisma || new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Persist the Prisma Client instance in non-production environments
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Optional: Close the Prisma Client connection on each request to avoid connection pooling issues in serverless
if (process.env.NODE_ENV === "production") {
  prisma.$disconnect();
}
