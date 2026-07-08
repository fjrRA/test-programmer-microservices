import {
  apiRequest,
} from "../../lib/api-client";

import type {
  Product,
  ProductInput,
} from "../../types/product";

type ProductListResponse = {
  success: boolean;
  data: Product[];
};

type ProductResponse = {
  success: boolean;
  message: string;
  data: Product;
};

type DeleteProductResponse = {
  success: boolean;
  message: string;
};

export async function getProducts():
  Promise<Product[]> {
  const response =
    await apiRequest<ProductListResponse>(
      "/products",
    );

  return response.data;
}

export async function createProduct(
  input: ProductInput,
): Promise<Product> {
  const response =
    await apiRequest<ProductResponse>(
      "/products",
      {
        method: "POST",

        body: JSON.stringify(
          input,
        ),
      },
    );

  return response.data;
}

export async function updateProduct(
  productId: number,
  input: ProductInput,
): Promise<Product> {
  const response =
    await apiRequest<ProductResponse>(
      `/products/${productId}`,
      {
        method: "PUT",

        body: JSON.stringify(
          input,
        ),
      },
    );

  return response.data;
}

export async function deleteProduct(
  productId: number,
): Promise<void> {
  await apiRequest<DeleteProductResponse>(
    `/products/${productId}`,
    {
      method: "DELETE",
    },
  );
}