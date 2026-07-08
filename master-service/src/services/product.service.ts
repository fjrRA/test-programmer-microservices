import {
  AppError,
} from "../errors/app-error";

import {
  deleteProductById,
  findAllProducts,
  findProductById,
  findProductByName,
  insertProduct,
  updateProductById,
} from "../repositories/product.repository";

import type {
  ProductBody,
} from "../schemas/product.schema";

export async function getProducts() {
  return findAllProducts();
}

export async function getProduct(
  id: number,
) {
  const product =
    await findProductById(id);

  if (!product) {
    throw new AppError(
      "Product not found",
      404,
    );
  }

  return product;
}

export async function createProduct(
  input: ProductBody,
) {
  const existingProduct =
    await findProductByName(input.name);

  if (existingProduct) {
    throw new AppError(
      "Product name already exists",
      409,
    );
  }

  return insertProduct(
    input.name,
    input.harga,
  );
}

export async function updateProduct(
  id: number,
  input: ProductBody,
) {
  const currentProduct =
    await findProductById(id);

  if (!currentProduct) {
    throw new AppError(
      "Product not found",
      404,
    );
  }

  const productWithSameName =
    await findProductByName(input.name);

  if (
    productWithSameName &&
    productWithSameName.id !== id
  ) {
    throw new AppError(
      "Product name already exists",
      409,
    );
  }

  return updateProductById(
    id,
    input.name,
    input.harga,
  );
}

export async function removeProduct(
  id: number,
) {
  const product =
    await findProductById(id);

  if (!product) {
    throw new AppError(
      "Product not found",
      404,
    );
  }

  await deleteProductById(id);
}