import dotenv from "dotenv";

// configuring dotenv
dotenv.config();

const PORT = Number(process.env.PORT);
const MONGODB_URI = process.env.MONGODB_URI;
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

if (!PORT) {
  throw new Error("PORT is not defined");
}

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined");
}

if (!BCRYPT_SALT_ROUNDS) {
  throw new Error("Salt rounds are not defined");
}

export const env = {
  port: PORT,
  mongoDbUri: MONGODB_URI,
  saltRounds: BCRYPT_SALT_ROUNDS,
};
