import type { Request, Response } from "express";
import { cookieOptions } from "../config/cookie.config.js";
import { loginService, signupService } from "../services/auth.service.js";
import {
  accessTokenExpiry,
  refreshTokenExpiry,
} from "../constants/auth.constants.js";

export const signup = async (req: Request, res: Response) => {
  const user = await signupService(req.body);
  return res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: {
      user,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const result = await loginService(req.body);

  // defining cookies
  res
    .cookie("accessToken", result.accessToken, {
      ...cookieOptions,
      maxAge: accessTokenExpiry,
    })
    .cookie("refreshToken", result.refreshToken, {
      ...cookieOptions,
      maxAge: refreshTokenExpiry,
    });

  return res.status(200).json({
    success: true,
    message: "Account login Succcessfully",
    data: result.user,
  });
};
