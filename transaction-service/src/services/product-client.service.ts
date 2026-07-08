import {
  env,
} from "../config/env";

import {
  AppError,
} from "../errors/app-error";

type Product = {
  id: number;
  name: string;
  harga: number;
};

export async function getProductFromGateway(
  productId: number,
): Promise<Product> {
  let response: globalThis.Response;

  try {
    response = await fetch(
      `${env.GATEWAY_URL}/internal/products/${productId}`,
      {
        headers: {
          "X-INTERNAL-KEY":
            env.INTERNAL_KEY,
        },
      },
    );
  } catch {
    throw new AppError(
      "Product service is unavailable",
      502,
    );
  }

  const result =
    await response.json() as {
      message?: string;
      data?: Product;
    };

  if (
    !response.ok ||
    !result.data
  ) {
    throw new AppError(
      result.message ??
      "Product not found",
      response.status || 404,
    );
  }

  return result.data;
}