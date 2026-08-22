import express from "express";
import { env } from "./config/env.config.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "kredo API is running successfully" });
});

app.listen(env.port, () => {
  console.log(`Server is running at port: ${env.port}`);
});