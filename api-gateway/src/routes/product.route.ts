import {
  Router,
} from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

import {
  authMiddleware,
} from "../middlewares/auth.middleware";

import {
  allowRoles,
} from "../middlewares/role.middleware";

export const productRouter =
  Router();

productRouter.get(
  "/",
  authMiddleware,
  allowRoles(
    "ADMIN",
    "PEMBELI",
  ),
  getProducts,
);

productRouter.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  createProduct,
);

productRouter.put(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  updateProduct,
);

productRouter.delete(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  deleteProduct,
);