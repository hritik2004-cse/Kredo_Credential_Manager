import { User } from "../models/user.model.js";
import { AppError } from "../utils/app-error.utils.js";
import type { SignupDTO } from "../dto/auth/signup.dto.js";

export const signupService = async (data: SignupDTO) => {
  const existingEmail = await User.findOne({
    email: data.email,
  });

  if (existingEmail) {
    throw new AppError(409, "Email is already registered");
  }

  const existingUsername = await User.findOne({
    userName: data.userName,
  });

  if (existingUsername) {
    throw new AppError(409, "Username is already taken");
  }

  const user = await User.create({
    userName: data.userName,
    email: data.email,
    password: data.password,
  });

  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
  };
};
