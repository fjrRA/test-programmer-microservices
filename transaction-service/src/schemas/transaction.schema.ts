import {
  z,
} from "zod";

export const addCartBodySchema =
  z.object({
    buyer_id: z
      .number()
      .int()
      .positive(),

    product_id: z
      .number()
      .int()
      .positive(),

    quantity: z
      .number()
      .int()
      .positive()
      .max(100)
      .default(1),
  });

export const checkoutBodySchema =
  z.object({
    buyer_id: z
      .number()
      .int()
      .positive(),
  });

export const buyerIdParamSchema =
  z.object({
    buyerId: z.coerce
      .number()
      .int()
      .positive(),
  });

export const transactionIdParamSchema =
  z.object({
    id: z.coerce
      .number()
      .int()
      .positive(),
  });

export const payTransactionBodySchema =
  z.object({
    buyer_id:
      z.number()
        .int()
        .positive(),
  });