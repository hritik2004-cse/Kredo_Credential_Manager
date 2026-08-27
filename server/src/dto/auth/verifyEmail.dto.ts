import { z } from "zod";

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export type verifyEmailDTO = z.infer<typeof verifyEmailSchema>