import {
  Router,
} from "express";

import {
  createNewProduct,
  deleteExistingProduct,
  getProductList,
  updateExistingProduct,
  getProductDetail,
} from "../controllers/product.controller";

export const productRouter =
  Router();

productRouter.get(
  "/",
  getProductList,
);

productRouter.get(
  "/:id",
  getProductDetail,
);

productRouter.post(
  "/",
  createNewProduct,
);

productRouter.put(
  "/:id",
  updateExistingProduct,
);

productRouter.delete(
  "/:id",
  deleteExistingProduct,
);