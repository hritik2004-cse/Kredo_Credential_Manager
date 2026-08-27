import { z } from "zod";

export const resendVerificationSchema = z.object({
  email: z.email().transform((email) => email.trim().toLowerCase()),
});

export type resendVerificationDTO = z.infer<typeof resendVerificationSchema>;
