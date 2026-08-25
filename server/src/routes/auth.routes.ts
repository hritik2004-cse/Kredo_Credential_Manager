import { Router } from "express";
import { loginSchema } from "../dto/auth/login.dto.js";
import { signupSchema } from "../dto/auth/signup.dto.js";
import validate from "../middleware/validate.middleware.js";
import { signup, login } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/login").post(validate(loginSchema), login);
authRouter.route("/signup").post(validate(signupSchema), signup);

export default authRouter;
