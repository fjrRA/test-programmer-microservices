import type {
  Request,
  Response,
} from "express";

import {
  addCartBodySchema,
  buyerIdParamSchema,
  checkoutBodySchema,
  payTransactionBodySchema,
  transactionIdParamSchema,
} from "../schemas/transaction.schema";

import {
  addProductToCart,
  checkout,
  getAllTransactions,
  getCart,
  getHistory,
  payTransaction,
} from "../services/transaction.service";

export async function getTransactionsForAdmin(
  _request: Request,
  response: Response,
): Promise<void> {
  const result =
    await getAllTransactions();

  response.status(200).json({
    success: true,
    data: result,
  });
}

export async function addCartItem(
  request: Request,
  response: Response,
): Promise<void> {
  const input =
    addCartBodySchema.parse(
      request.body,
    );

  const result =
    await addProductToCart(
      input.buyer_id,
      input.product_id,
      input.quantity,
    );

  response.status(201).json({
    success: true,
    message:
      "Product added to cart",
    data: result,
  });
}

export async function getBuyerCart(
  request: Request,
  response: Response,
): Promise<void> {
  const { buyerId } =
    buyerIdParamSchema.parse(
      request.params,
    );

  const result =
    await getCart(buyerId);

  response.status(200).json({
    success: true,
    data: result,
  });
}

export async function checkoutCart(
  request: Request,
  response: Response,
): Promise<void> {
  const { buyer_id } =
    checkoutBodySchema.parse(
      request.body,
    );

  const result =
    await checkout(buyer_id);

  response.status(201).json({
    success: true,
    message:
      "Checkout successful",
    data: result,
  });
}

export async function getBuyerTransactions(
  request: Request,
  response: Response,
): Promise<void> {
  const { buyerId } =
    buyerIdParamSchema.parse(
      request.params,
    );

  const result =
    await getHistory(buyerId);

  response.status(200).json({
    success: true,
    data: result,
  });
}

export async function payExistingTransaction(
  request: Request,
  response: Response,
): Promise<void> {
  const { id } =
    transactionIdParamSchema.parse(
      request.params,
    );

  const { buyer_id } =
    payTransactionBodySchema.parse(
      request.body,
    );

  const result =
    await payTransaction(
      id,
      buyer_id,
    );

  response.status(200).json({
    success: true,
    message:
      "Transaction paid successfully",
    data: result,
  });
}