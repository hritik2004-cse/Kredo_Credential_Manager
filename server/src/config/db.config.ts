import mongoose from "mongoose";
import { env } from "./env.config.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(env.mongoDbUri);
    console.log(
      `MongoDB connected successfully : ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    throw error;
  }
};

export default connectDB;
