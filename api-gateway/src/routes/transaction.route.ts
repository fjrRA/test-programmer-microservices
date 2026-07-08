import {
  Router,
} from "express";

import {
  addToCart,
  checkout,
  getAllTransactions,
  getCart,
  getTransactions,
  payTransaction,
} from "../controllers/transaction.controller";

import {
  authMiddleware,
} from "../middlewares/auth.middleware";

import {
  allowRoles,
} from "../middlewares/role.middleware";

export const transactionRouter =
  Router();

transactionRouter.get(
  "/admin/transactions",
  authMiddleware,
  allowRoles("ADMIN"),
  getAllTransactions,
);

transactionRouter.post(
  "/cart/add",
  authMiddleware,
  allowRoles("PEMBELI"),
  addToCart,
);

transactionRouter.get(
  "/cart",
  authMiddleware,
  allowRoles("PEMBELI"),
  getCart,
);

transactionRouter.post(
  "/checkout",
  authMiddleware,
  allowRoles("PEMBELI"),
  checkout,
);

transactionRouter.get(
  "/transactions",
  authMiddleware,
  allowRoles("PEMBELI"),
  getTransactions,
);

transactionRouter.put(
  "/transactions/:id/pay",
  authMiddleware,
  allowRoles("PEMBELI"),
  payTransaction,
);