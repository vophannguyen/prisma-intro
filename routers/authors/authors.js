const express = require("express");
const prisma = require("../../prisma");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  const authors = await prisma.author.findMany();
  if (!authors) {
    res.status(404).json({ error: "Not Found Authors" });
  }
  res.json(authors);
});

router.get("/:id", async (req, res, next) => {
  const id = +req.params.id;
  const author = await prisma.author.findUnique({
    where: {
      id: id,
    },
  });
  if (!author) {
    res.status(404).json({ error: "Not Found Author" });
  } else {
    res.json(author);
  }
});
router.put("/:id", async (req, res, next) => {
  const id = +req.params.id;
  const updateauthor = await prisma.author.update({
    where: {
      id: id,
    },
    data: {
      name: "Nguyen Vo",
    },
  });
  if (!updateauthor) {
    res.status(404).json({ error: "Not Found" });
  } else {
    res.json(updateauthor);
  }
});
router.delete("/:id", async (req, res, next) => {
  const id = +req.params.id;
  const deleteBooks = await prisma.book.deleteMany({
    where: {
      authorId: id,
    },
  });
  const deleteAuthor = await prisma.author.delete({
    where: {
      id: id,
    },
  });
  if (!deleteAuthor) {
    res.status(404).json({ error: "Not Found" });
  } else {
    res.json(deleteAuthor);
  }
});
