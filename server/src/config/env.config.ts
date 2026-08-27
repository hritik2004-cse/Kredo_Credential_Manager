import dotenv from "dotenv";

// configuring dotenv
dotenv.config();

const {
  NODE_ENV,
  CLIENT_URL,
  MONGODB_URI,
  EMAIL_JS_SERVICE_ID,
  EMAIL_JS_PUBLIC_KEY,
  EMAIL_JS_PRIVATE_KEY,
  EMAIL_JS_VERIFY_EMAIL_TEMPLATE,
  EMAIL_JS_RESET_PASSWORD_TEMPLATE,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} = process.env;

const PORT = Number(process.env.PORT);
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);
const EMAIL_VERIFICATION_TOKEN_EXPIRY = Number(
  process.env.EMAIL_VERIFICATION_TOKEN_EXPIRY,
);
const RESET_PASSWORD_TOKEN_EXPIRY = Number(
  process.env.RESET_PASSWORD_TOKEN_EXPIRY,
);
const JWT_ACCESS_TOKEN_EXPIRY = Number(process.env.JWT_ACCESS_TOKEN_EXPIRY);
const JWT_REFRESH_TOKEN_EXPIRY = Number(process.env.JWT_REFRESH_TOKEN_EXPIRY);

if (!Number.isInteger(PORT) || PORT < 1000) {
  throw new Error("Invalid port number");
}

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined");
}

if (!CLIENT_URL) {
  throw new Error("Client URL is not defined");
}

if (NODE_ENV !== "development" && NODE_ENV !== "production") {
  throw new Error("NODE_ENV must be either development or production");
}

if (
  !Number.isInteger(EMAIL_VERIFICATION_TOKEN_EXPIRY) ||
  EMAIL_VERIFICATION_TOKEN_EXPIRY <= 0
) {
  throw new Error("Invalid email verification token expiry");
}

if (
  !Number.isInteger(RESET_PASSWORD_TOKEN_EXPIRY) &&
  RESET_PASSWORD_TOKEN_EXPIRY <= 600000
) {
  throw new Error("Invalid reset password token expiry");
}

if (!Number.isInteger(BCRYPT_SALT_ROUNDS) || BCRYPT_SALT_ROUNDS <= 0) {
  throw new Error("Invalid salt rounds");
}

if (!EMAIL_JS_SERVICE_ID) {
  throw new Error("emailjs service id is not defined");
}

if (!EMAIL_JS_PUBLIC_KEY) {
  throw new Error("emailjs public key is not defined");
}

if (!EMAIL_JS_PRIVATE_KEY) {
  throw new Error("emailjs private key is not defined");
}

if (!EMAIL_JS_VERIFY_EMAIL_TEMPLATE) {
  throw new Error("emailjs email verification template is not defined");
}

if (!EMAIL_JS_RESET_PASSWORD_TEMPLATE) {
  throw new Error("emailjs password reset template is not defined");
}

if (!JWT_ACCESS_TOKEN_SECRET) {
  throw new Error("Access token secret is not defined");
}

if (
  !Number.isInteger(JWT_ACCESS_TOKEN_EXPIRY) ||
  JWT_ACCESS_TOKEN_EXPIRY <= 0
) {
  throw new Error("Invalid access token expiry");
}

if (!JWT_REFRESH_TOKEN_SECRET) {
  throw new Error("Refresh token secret is not defined");
}

if (
  !Number.isInteger(JWT_REFRESH_TOKEN_EXPIRY) ||
  JWT_REFRESH_TOKEN_EXPIRY <= 0
) {
  throw new Error("Invalid refresh token expiry");
}

export const env = {
  port: PORT,
  nodeEnv: NODE_ENV,
  clientUrl: CLIENT_URL,
  mongoDbUri: MONGODB_URI,
  saltRounds: BCRYPT_SALT_ROUNDS,
  emailjsServiceId: EMAIL_JS_SERVICE_ID,
  emailjsPublicKey: EMAIL_JS_PUBLIC_KEY,
  emailjsPrivateKey: EMAIL_JS_PRIVATE_KEY,
  jwtAccessTokenSecret: JWT_ACCESS_TOKEN_SECRET,
  jwtAccessTokenExpiry: JWT_ACCESS_TOKEN_EXPIRY,
  jwtRefreshTokenSecret: JWT_REFRESH_TOKEN_SECRET,
  jwtRefreshTokenExpiry: JWT_REFRESH_TOKEN_EXPIRY,
  resetPasswordTokenExpiry: RESET_PASSWORD_TOKEN_EXPIRY,
  emailjsVerifyEmailTemplate: EMAIL_JS_VERIFY_EMAIL_TEMPLATE,
  emailVerificationTokenExpiry: EMAIL_VERIFICATION_TOKEN_EXPIRY,
  emailjsResetPasswordTemplate: EMAIL_JS_RESET_PASSWORD_TEMPLATE,
};
