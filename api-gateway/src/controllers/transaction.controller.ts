import type {
  Request,
  Response,
} from "express";

import {
  AppError,
} from "../errors/app-error";

import {
  requestTransactionService,
} from "../services/transaction-client.service";

function getUserId(
  request: Request,
): number {
  if (!request.user) {
    throw new AppError(
      "Authentication is required",
      401,
    );
  }

  return request.user.user_id;
}

export async function getAllTransactions(
  _request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestTransactionService(
      "/admin/transactions",
    );

  response.status(200).json(
    result,
  );
}

export async function addToCart(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestTransactionService(
      "/cart/add",
      {
        method: "POST",
        body: {
          buyer_id:
            getUserId(request),

          product_id:
            request.body.product_id,

          quantity:
            request.body.quantity,
        },
      },
    );

  response.status(201).json(result);
}

export async function getCart(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestTransactionService(
      `/cart/${getUserId(request)}`,
    );

  response.status(200).json(result);
}

export async function checkout(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestTransactionService(
      "/checkout",
      {
        method: "POST",
        body: {
          buyer_id:
            getUserId(request),
        },
      },
    );

  response.status(201).json(result);
}

export async function getTransactions(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestTransactionService(
      `/transactions/${getUserId(request)}`,
    );

  response.status(200).json(result);
}

export async function payTransaction(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestTransactionService(
      `/transactions/${request.params.id}/pay`,
      {
        method: "PUT",

        body: {
          buyer_id:
            getUserId(request),
        },
      },
    );

  response.status(200).json(result);
}

