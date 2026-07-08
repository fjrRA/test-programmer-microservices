import {
  Router,
} from "express";

import {
  getProductById,
} from "../controllers/product.controller";

import {
  internalKeyMiddleware,
} from "../middlewares/internal-key.middleware";

export const internalRouter =
  Router();

internalRouter.use(
  internalKeyMiddleware,
);

internalRouter.get(
  "/products/:id",
  getProductById,
);