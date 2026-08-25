import { z } from "zod";

export const signupSchema = z.object({
  userName: z.string().trim().toLowerCase().min(1),
  email: z.email().transform((email) => email.trim().toLowerCase()),
  password: z.string().min(8),
});

export type SignupDTO = z.infer<typeof signupSchema>; // this will convert the signupSchema to ts automatically
