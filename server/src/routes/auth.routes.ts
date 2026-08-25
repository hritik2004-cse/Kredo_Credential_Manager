import { Router } from "express";
import { signupSchema } from "../dto/auth/signup.dto.js";
import { signup } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.middleware.js";

const authRouter = Router();

authRouter.route("/signup").post(validate(signupSchema), signup);

export default authRouter;