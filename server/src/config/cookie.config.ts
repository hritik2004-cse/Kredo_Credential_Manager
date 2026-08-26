import type { CookieOptions } from "express";
import { env } from "./env.config.js";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: env.nodeEnv === "production" ? "none" : "lax",
};
