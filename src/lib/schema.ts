import { z } from "zod";

export const botSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Bot name is required",
    })
    .max(20, {
      message: "Bot name must be max 20 characters long",
    }),
  description: z
    .string()
    .trim()
    .min(1, {
      message: "Description is required",
    })
    .max(100, {
      message: "Bot description must be max 100 characters long",
    }),
  about: z
    .string()
    .trim()
    .min(1, {
      message: "About is required",
    })
    .max(50, {
      message: "Bot about must be max 50 characters long",
    }),
});
