const express = require("express");
const app = express();
const PORT = 5050;

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.use("/books", require("./routers/books/books.js"));
app.use("/authors", require("./routers/authors/authors.js"));
app.listen(PORT);
