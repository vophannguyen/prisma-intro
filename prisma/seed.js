const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create 20 authors with 3 books each
  let index = 1;
  while (index <= 20) {
    const result = await prisma.author.create({
      data: {
        name: "author" + index,
        books: {
          create: [
            {
              title: "How to make an omelette",
            },
            {
              title: "Books 2",
            },
            {
              title: "book 3",
            },
          ],
        },
      },
      include: {
        books: true,
      },
    });
    index++;
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
