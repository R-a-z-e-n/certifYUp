import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // Prisma 7 handles the URL automatically via prisma.config.ts
  // so we can use a clean constructor here.
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export { prisma };
export default prisma;
