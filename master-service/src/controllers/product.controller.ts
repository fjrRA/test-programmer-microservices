import type {
  Request,
  Response,
} from "express";

import {
  productBodySchema,
  productIdSchema,
} from "../schemas/product.schema";

import {
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../services/product.service";

export async function getProductList(
  _request: Request,
  response: Response,
): Promise<void> {
  const products =
    await getProducts();

  response.status(200).json({
    success: true,
    data: products,
  });
}

export async function getProductDetail(
  request: Request,
  response: Response,
): Promise<void> {
  const { id } =
    productIdSchema.parse(
      request.params,
    );

  const product =
    await getProduct(id);

  response.status(200).json({
    success: true,
    data: product,
  });
}

export async function createNewProduct(
  request: Request,
  response: Response,
): Promise<void> {
  const input =
    productBodySchema.parse(
      request.body,
    );

  const product =
    await createProduct(input);

  response.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
}

export async function updateExistingProduct(
  request: Request,
  response: Response,
): Promise<void> {
  const {
    id,
  } = productIdSchema.parse(
    request.params,
  );

  const input =
    productBodySchema.parse(
      request.body,
    );

  const product =
    await updateProduct(
      id,
      input,
    );

  response.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
}

export async function deleteExistingProduct(
  request: Request,
  response: Response,
): Promise<void> {
  const {
    id,
  } = productIdSchema.parse(
    request.params,
  );

  await removeProduct(id);

  response.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
}