import { Prisma, PrismaClient, Product } from '@prisma/client'
import { faker } from '@faker-js/faker';


const prisma = new PrismaClient()

async function main() {

  await prisma.product.deleteMany();
  await prisma.$queryRaw(Prisma.sql`DELETE FROM sqlite_sequence WHERE NAME='Product';`);

  const totalProducts = 200;

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