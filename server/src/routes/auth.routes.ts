import { Router } from "express";
import { loginSchema } from "../dto/auth/login.dto.js";
import { signupSchema } from "../dto/auth/signup.dto.js";
import validate from "../middleware/validate.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  login,
  signup,
  logout,
  getCurrentUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/refresh").post(refreshAccessToken);
authRouter.route("/logout").post(authMiddleware, logout);
authRouter.route("/me").get(authMiddleware, getCurrentUser);
authRouter.route("/login").post(validate(loginSchema), login);
authRouter.route("/signup").post(validate(signupSchema), signup);

export default authRouter;
