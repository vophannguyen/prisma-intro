const express = require("express");
const prisma = require("../../prisma");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

router.get("/:id", async (req, res, next) => {
  const id = +req.params.id;
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  if (!book?.id) {
    res.status(404).json({ erorr: "Not Found" });
  } else {
    res.send(book);
  }
});
router.put("/:id", async (req, res, next) => {
  const id = +req.params.id;
  const updateBook = await prisma.book.update({
    where: {
      id: id,
    },
    data: {
      title: "Nguyen Update",
    },
  });
  res.send(updateBook);
});
router.delete("/:id", async (req, res, next) => {
  const id = +req.params.id;
  const deleteBook = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  if (!deleteBook) {
    res.status(404).json({ error: "Not Found" });
  } else {
    res.json(deleteBook);
  }
});
