import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";
import type { TokenPayload } from "../types/user.types.js";

export const getTokenPayload = (
  decoded: string | jwt.JwtPayload,
): TokenPayload => {
  if (typeof decoded !== "object" || typeof decoded.sub !== "string") {
    throw new Error("Invalid token payload");
  }
  return {
    sub: decoded.sub,
  };
};

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    {
      sub: userId,
    },
    env.jwtAccessTokenSecret,
    {
      expiresIn: env.jwtAccessTokenExpiry,
    },
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      sub: userId,
    },
    env.jwtRefreshTokenSecret,
    {
      expiresIn: env.jwtRefreshTokenExpiry,
    },
  );
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, env.jwtAccessTokenSecret);
  return getTokenPayload(decoded);
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, env.jwtRefreshTokenSecret);
  return getTokenPayload(decoded);
};
