import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Server is Running");
  res.json({ message: "server is running successfully" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started at port ", port);
});
