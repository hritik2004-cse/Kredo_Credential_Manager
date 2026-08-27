import { Router } from "express";
import { loginSchema } from "../dto/auth/login.dto.js";
import { signupSchema } from "../dto/auth/signup.dto.js";
import validate from "../middleware/validate.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { verifyEmailSchema } from "../dto/auth/verifyEmail.dto.js";
import { resetPasswordSchema } from "../dto/auth/reset-password.dto.js";
import { forgetPasswordSchema } from "../dto/auth/forgetPassword.dto.js";
import { resendVerificationSchema } from "../dto/auth/resend-verification.dto.js";
import {
  login,
  signup,
  logout,
  verifyEmail,
  resetPassword,
  deleteAccount,
  forgetPassword,
  getCurrentUser,
  refreshAccessToken,
  resendVerification,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/refresh").post(refreshAccessToken);
authRouter.route("/logout").post(authMiddleware, logout);
authRouter.route("/me").get(authMiddleware, getCurrentUser);
authRouter.route("/login").post(validate(loginSchema), login);
authRouter.route("/signup").post(validate(signupSchema), signup);
authRouter.route("/delete-account").delete(authMiddleware, deleteAccount);
authRouter
  .route("/forget-password")
  .post(validate(forgetPasswordSchema), forgetPassword);
authRouter
  .route("/reset-password")
  .post(validate(resetPasswordSchema), resetPassword);
authRouter
  .route("/verify-email")
  .post(validate(verifyEmailSchema), verifyEmail);
authRouter
  .route("/resend-verification")
  .post(validate(resendVerificationSchema), resendVerification);

export default authRouter;
