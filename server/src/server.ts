import express from "express";
import cookieParser from "cookie-parser";
import { env } from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "kredo API is running successfully" });
});

// using error handling middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`Server is running at port: ${env.port}`);
    });
  } catch (error) {
    console.error(`MongoDb connection error: ${error}`);
  }
};

startServer(); // starting server
