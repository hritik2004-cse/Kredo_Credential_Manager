import { AppError } from "../utils/app-error.utils.js";
import { verifyAccessToken } from "../utils/jwt.utils.js";
import type { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new AppError(401, "Authentication reqiured");
  }

  // verifying token
  const payload = verifyAccessToken(token);
  req.userId = payload.sub;
  return next();
};

export default authMiddleware;
