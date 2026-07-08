import {
  Router,
} from "express";

import {
  addCartItem,
  checkoutCart,
  getBuyerCart,
  getBuyerTransactions,
  getTransactionsForAdmin,
  payExistingTransaction,
} from "../controllers/transaction.controller";

export const transactionRouter =
  Router();

transactionRouter.get(
  "/admin/transactions",
  getTransactionsForAdmin,
);

transactionRouter.post(
  "/cart/add",
  addCartItem,
);

transactionRouter.get(
  "/cart/:buyerId",
  getBuyerCart,
);

transactionRouter.post(
  "/checkout",
  checkoutCart,
);

transactionRouter.get(
  "/transactions/:buyerId",
  getBuyerTransactions,
);

transactionRouter.put(
  "/transactions/:id/pay",
  payExistingTransaction,
);