import dotenv from "dotenv";

// configuring dotenv
dotenv.config();

const PORT = Number(process.env.PORT);
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI;
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

// jwt env
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_SECRET_EXPIRY = Number(
  process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRY,
);
const JWT_REFRESH_TOKEN_SECRET_EXPIRY = Number(
  process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRY,
);

if (!Number.isInteger(PORT) || PORT < 1000) {
  throw new Error("Invalid port number");
}

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined");
}

if(!NODE_ENV){
  throw new Error("No environment provided")
}

if (!Number.isInteger(BCRYPT_SALT_ROUNDS) || BCRYPT_SALT_ROUNDS <= 0) {
  throw new Error("Invalid salt rounds");
}

if (!JWT_ACCESS_TOKEN_SECRET) {
  throw new Error("Access token secret is not defined");
}

if (
  !Number.isInteger(JWT_ACCESS_TOKEN_SECRET_EXPIRY) ||
  JWT_ACCESS_TOKEN_SECRET_EXPIRY <= 0
) {
  throw new Error("Invalid access token expiry");
}

if (!JWT_REFRESH_TOKEN_SECRET) {
  throw new Error("Refresh token secret is not defined");
}

if (
  !Number.isInteger(JWT_REFRESH_TOKEN_SECRET_EXPIRY) ||
  JWT_REFRESH_TOKEN_SECRET_EXPIRY <= 0
) {
  throw new Error("Invalid refresh token expiry");
}

export const env = {
  port: PORT,
  nodeEnv: NODE_ENV,
  mongoDbUri: MONGODB_URI,
  saltRounds: BCRYPT_SALT_ROUNDS,
  jwtAccessTokenSecret: JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: JWT_REFRESH_TOKEN_SECRET,
  jwtAccessTokenExpiry: JWT_ACCESS_TOKEN_SECRET_EXPIRY,
  jwtRefreshTokenExpiry: JWT_REFRESH_TOKEN_SECRET_EXPIRY,
};
