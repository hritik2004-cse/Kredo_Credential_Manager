// note - we can use password?: string instead of password: string | null it is only a design choice
export interface IUser {
  profileImg: {
    url: string;
    publicId: string;
  };
  userName: string;
  email: string;
  isEmailVerified: boolean;
  password?: string;
  provider: "local" | "google";
  googleId?: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
}
