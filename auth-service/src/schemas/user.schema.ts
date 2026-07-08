import { z } from "zod";

export const createUserBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(255),

  email: z
    .string()
    .trim()
    .email(),

  password: z
    .string()
    .min(6),

  status: z
    .boolean()
    .default(true),

  role: z.enum([
    "ADMIN",
    "PEMBELI",
  ]),
});

export const updateUserBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(255),

  email: z
    .string()
    .trim()
    .email(),

  password: z
    .string()
    .min(6)
    .optional(),

  status: z.boolean(),

  role: z.enum([
    "ADMIN",
    "PEMBELI",
  ]),
});

export const userIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive(),
});

export type CreateUserBody =
  z.infer<typeof createUserBodySchema>;

export type UpdateUserBody =
  z.infer<typeof updateUserBodySchema>;