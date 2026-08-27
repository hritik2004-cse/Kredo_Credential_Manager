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
  logoutService,
  verifyEmailService,
  resetPasswordService,
  deleteAccountService,
  forgetPasswordService,
  getCurrentUserService,
  resendVerificationService,
  refreshAccessTokenService,
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

// verify email controller
export const verifyEmail = async (req: Request, res: Response) => {
  await verifyEmailService(req.body!);

  return res
    .status(200)
    .json({ success: true, message: "Email verified successfully" });
};

// resend verification controller
export const resendVerification = async (req: Request, res: Response) => {
  await resendVerificationService(req.body!);

  return res
    .status(200)
    .json({ success: true, message: "Email verification sent successfully" });
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
  const { refreshToken } = req.cookies;

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

// forget password controller
export const forgetPassword = async (req: Request, res: Response) => {
  await forgetPasswordService(req.body!);

  return res
    .status(200)
    .json({ success: true, message: "forget Password link sent" });
};

// reset password controller
export const resetPassword = async (req: Request, res: Response) => {
  await resetPasswordService(req.body!);

  return res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
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

// delete account controller
export const deleteAccount = async (req: Request, res: Response) => {
  await deleteAccountService(req.userId!);

  return res
    .status(200)
    .json({ success: true, message: "Account deleted successfully" });
};
