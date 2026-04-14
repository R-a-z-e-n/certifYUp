import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  // In Prisma 7, we explicitly pass the URL here if it's missing from the schema
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export { prisma };
export default prisma;
