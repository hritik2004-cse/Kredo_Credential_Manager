import bcrypt from "bcrypt";
import { env } from "../config/env.config.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/app-error.utils.js";
import type { LoginDTO } from "../dto/auth/login.dto.js";
import type { SignupDTO } from "../dto/auth/signup.dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.utils.js";

// signup service
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

// login service
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

  // hashing refresh token before saving it to DB.
  const hashedRefreshToken = await bcrypt.hash(refreshToken, env.saltRounds);
  user.refreshToken = hashedRefreshToken;
  await user.save();

  return {
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

// get current user service
export const getCurrentUserService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
    profileImgUrl: user.profileImg.url,
    isEmailVerified: user.isEmailVerified,
    provider: user.provider,
  };
};

// refresh access token service
export const refreshAccessTokenService = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  const user = await User.findById(payload.sub);

  const isRefreshTokenValid = await bcrypt.compare(
    refreshToken,
    user?.refreshToken!,
  );

  if (!user || !user.refreshToken || !isRefreshTokenValid) {
    throw new AppError(401, "Invalid refresh token");
  }

  const userId = user._id.toString(); // because prior it was an obj id so then we convert it to string
  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = generateRefreshToken(userId);
  const newHashedToken = await bcrypt.hash(newRefreshToken, env.saltRounds);
  user.refreshToken = newHashedToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

// logout service
export const logoutService = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { $set: { refreshToken: "" } });
};
