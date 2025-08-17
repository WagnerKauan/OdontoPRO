import { PrismaClient } from "../generated/prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globaiWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  if (!globaiWithPrisma.prisma) {
    globaiWithPrisma.prisma = new PrismaClient();
  }

  prisma = globaiWithPrisma.prisma;
}

export default prisma;
