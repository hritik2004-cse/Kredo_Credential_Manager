import bcrypt from "bcrypt";
import crypto from "crypto";
import { env } from "../config/env.config.js";
import { User } from "../models/user.model.js";
import sendEmail from "../config/emailjs.config.js";
import { AppError } from "../utils/app-error.utils.js";
import type { LoginDTO } from "../dto/auth/login.dto.js";
import type { SignupDTO } from "../dto/auth/signup.dto.js";
import type { verifyEmailDTO } from "../dto/auth/verifyEmail.dto.js";
import type { ForgetPasswordDTO } from "../dto/auth/forgetPassword.dto.js";
import type { resendVerificationDTO } from "../dto/auth/resend-verification.dto.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.utils.js";
import type { ResetPasswordDTO } from "../dto/auth/reset-password.dto.js";

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

  // email js
  const { userName, email } = user;
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const hashedEmailVerificationToken = crypto
    .createHash("sha256")
    .update(emailVerificationToken)
    .digest("hex");
  const verificationTokenExpiry = new Date(
    Date.now() + env.emailVerificationTokenExpiry,
  );

  const verificationLink = `${env.clientUrl}/verify-email?token=${emailVerificationToken}`;
  user.emailVerificationToken = hashedEmailVerificationToken;
  user.emailVerificationTokenExpiry = verificationTokenExpiry;
  await user.save();

  await sendEmail({
    templateId: env.emailjsVerifyEmailTemplate,
    templateParams: {
      userName,
      email,
      link: verificationLink,
    },
  });

  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
  };
};

// email verification service
export const verifyEmailService = async (data: verifyEmailDTO) => {
  if (!data.token) {
    throw new AppError(400, "Token not found");
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(data.token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: {
      $gt: new Date(),
    },
  });

  if (!user) {
    throw new AppError(400, "Invalid or expired link");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = "";
  user.emailVerificationTokenExpiry = null;
  await user.save();
};

// resend verification service
export const resendVerificationService = async (
  data: resendVerificationDTO,
) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  if (user.isEmailVerified) {
    throw new AppError(400, "Account already verified");
  }

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  const hashedEmailVerificationToken = crypto
    .createHash("sha256")
    .update(emailVerificationToken)
    .digest("hex");
  const verificationTokenExpiry = new Date(
    Date.now() + env.emailVerificationTokenExpiry,
  );

  user.emailVerificationToken = hashedEmailVerificationToken;
  user.emailVerificationTokenExpiry = verificationTokenExpiry;
  await user.save();

  const verificationLink = `${env.clientUrl}/verify-email?token=${emailVerificationToken}`;
  const { userName, email } = user;

  await sendEmail({
    templateId: env.emailjsVerifyEmailTemplate,
    templateParams: {
      userName,
      email,
      link: verificationLink,
    },
  });
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

  if (!user || !user.refreshToken) {
    throw new AppError(401, "Invalid refresh token");
  }

  const currenthashedToken = user.refreshToken;
  const isRefreshTokenValid = await bcrypt.compare(
    refreshToken,
    currenthashedToken,
  );

  if (!isRefreshTokenValid) {
    throw new AppError(401, "Invalid refresh token");
  }

  const userId = user._id.toString(); // because prior it was an obj id so then we convert it to string
  const newAccessToken = generateAccessToken(userId);
  const newRefreshToken = generateRefreshToken(userId);
  const newHashedToken = await bcrypt.hash(newRefreshToken, env.saltRounds);

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: user._id,
      refreshToken: currenthashedToken,
    },
    { $set: { refreshToken: newHashedToken } },
    { new: true },
  );

  if (!updatedUser) {
    throw new AppError(401, "Refresh token already used");
  }

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

// logout service
export const logoutService = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { $set: { refreshToken: "" } });
};

// forget password service
export const forgetPasswordService = async (data: ForgetPasswordDTO) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const tokenExpiry = new Date(Date.now() + env.resetPasswordTokenExpiry);

  user.resetToken = hashedToken;
  user.resetTokenExpiry = tokenExpiry;
  await user.save();

  const { userName, email } = user;
  const passwordResetLink = `${env.clientUrl}/reset-password?token=${token}`;

  await sendEmail({
    templateId: env.emailjsResetPasswordTemplate,
    templateParams: {
      userName,
      email,
      link: passwordResetLink,
    },
  });
};

// reset password service
export const resetPasswordService = async (data: ResetPasswordDTO) => {
  const { token, newPassword } = data;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new AppError(400, "Invalid or expired token");
  }

  user.password = newPassword;
  user.resetToken = "";
  user.resetTokenExpiry = null;

  // Invalidate existing refresh session
  user.refreshToken = "";

  await user.save();
};

// delete account service
export const deleteAccountService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  await User.findByIdAndDelete(userId);
};
