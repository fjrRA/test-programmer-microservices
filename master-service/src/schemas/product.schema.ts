import {
  z,
} from "zod";

export const productBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(255),

  harga: z
    .number()
    .nonnegative(
      "Harga cannot be negative",
    ),
});

export const productIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive(),
});

export type ProductBody =
  z.infer<typeof productBodySchema>;