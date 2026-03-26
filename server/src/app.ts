import express from "express";
require("dotenv").config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World from Express & TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
