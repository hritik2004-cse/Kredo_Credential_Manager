// note - we can use password?: string instead of password: string | null it is only a design choice
export interface IUser {
  profileImg: {
    url: string;
    publicId: string;
  };
  userName: string;
  email: string;
  isEmailVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpiry?: Date | null;
  password?: string;
  provider: "local" | "google";
  googleId?: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  refreshToken?: string;
}

export interface TokenPayload {
  sub: string;
}
