import type { Request, Response } from "express";
import { AppError } from "../utils/app-error.utils.js";
import { cookieOptions } from "../config/cookie.config.js";
import {
  accessTokenExpiry,
  refreshTokenExpiry,
} from "../constants/auth.constants.js";
import {
  loginService,
  signupService,
  getCurrentUserService,
  refreshAccessTokenService,
  logoutService,
} from "../services/auth.service.js";

// signup controller
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

// login controller
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

// get current user controller
export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await getCurrentUserService(req.userId!);

  return res.status(200).json({
    success: true,
    message: "Current user fetched successfully",
    data: user,
  });
};

// refresh access token controller
export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(401, "Refresh token required");
  }

  const result = await refreshAccessTokenService(refreshToken);
  res
    .cookie("accessToken", result.accessToken, {
      ...cookieOptions,
      maxAge: accessTokenExpiry,
    })
    .cookie("refreshToken", result.refreshToken, {
      ...cookieOptions,
      maxAge: refreshTokenExpiry,
    });

  res
    .status(200)
    .json({ success: true, message: "Access token refreshed successfully" });
};

// logout controller
export const logout = async (req: Request, res: Response) => {
  await logoutService(req.userId!);

  res
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions);

  return res
    .status(200)
    .json({ success: true, message: "Account logout successfully" });
};
