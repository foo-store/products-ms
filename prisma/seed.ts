import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient()

async function main() {

  await prisma.product.deleteMany();
  await prisma.$queryRaw(Prisma.sql`DELETE FROM sqlite_sequence WHERE NAME='Product';`);

  const totalProducts = parseInt(process.env.PRODUCTS_MIN_ITEMS || '100');

  const products = Array.from({ length: totalProducts }, (_, i) => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 10, max: 1000 })),
  }))

  await prisma.product.createMany({ data: products })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })