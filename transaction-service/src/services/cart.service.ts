import {
  findOpenCartItem,
  findOpenCartItems,
  insertCartItem,
  updateCartItem,
} from "../repositories/transaction.repository";

import {
  getProductFromGateway,
} from "./product-client.service";

export async function addProductToCart(
  buyerId: number,
  productId: number,
  quantity: number,
) {
  const product =
    await getProductFromGateway(
      productId,
    );

  const existingItem =
    await findOpenCartItem(
      buyerId,
      productId,
    );

  if (existingItem) {
    await updateCartItem(
      existingItem.id,
      product.harga,
      existingItem.quantity +
      quantity,
    );
  } else {
    await insertCartItem(
      buyerId,
      productId,
      product.harga,
      quantity,
    );
  }

  return getCart(buyerId);
}

export async function getCart(
  buyerId: number,
) {
  const items =
    await findOpenCartItems(
      buyerId,
    );

  const mappedItems =
    items.map((item) => ({
      ...item,

      subtotal:
        item.harga *
        item.quantity,
    }));

  const total =
    mappedItems.reduce(
      (
        currentTotal,
        item,
      ) =>
        currentTotal +
        item.subtotal,
      0,
    );

  return {
    items: mappedItems,
    total,
  };
}