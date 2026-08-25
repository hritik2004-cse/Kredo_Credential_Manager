import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/app-error.utils.js";
import type { LoginDTO } from "../dto/auth/login.dto.js";
import type { SignupDTO } from "../dto/auth/signup.dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.utils.js";

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

export const loginService = async (data: LoginDTO) => {
  const user = await User.findOne({ email: data.email }).select("+password");

  if (!user) {
    throw new AppError(401, "Invalid email and password");
  }

  if (!user.password) {
    throw new AppError(401, "Invalid email and password");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email and password");
  }

  if (!user.isEmailVerified) {
    throw new AppError(403, "Please verify your email first");
  }

  const userId = user._id.toString();
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
    accessToken: accessToken,
    refreshToken:refreshToken
  };
};
