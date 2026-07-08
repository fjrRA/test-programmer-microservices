import {
  apiRequest,
} from "../../lib/api-client";

import type {
  Cart,
} from "../../types/cart";

import type {
  CheckoutTransaction,
} from "../../types/transaction";

type AddToCartInput = {
  productId: number;
  quantity: number;
};

type CartResponse = {
  success: boolean;
  message?: string;
  data: Cart;
};

type CheckoutResponse = {
  success: boolean;
  message: string;
  data: CheckoutTransaction;
};

export async function addToCart(
  input: AddToCartInput,
): Promise<Cart> {
  const response =
    await apiRequest<CartResponse>(
      "/cart/add",
      {
        method: "POST",

        body: JSON.stringify({
          product_id:
            input.productId,

          quantity:
            input.quantity,
        }),
      },
    );

  return response.data;
}

export async function getCart():
  Promise<Cart> {
  const response =
    await apiRequest<CartResponse>(
      "/cart",
    );

  return response.data;
}

export async function checkoutCart():
  Promise<CheckoutTransaction> {
  const response =
    await apiRequest<CheckoutResponse>(
      "/checkout",
      {
        method: "POST",
      },
    );

  return response.data;
}