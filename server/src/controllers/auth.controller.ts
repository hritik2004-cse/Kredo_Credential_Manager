import type { Request, Response } from "express";
import { signupService } from "../services/auth.service.js";

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
