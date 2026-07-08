import {
  randomUUID,
} from "node:crypto";

import {
  database,
} from "../config/database";

import {
  AppError,
} from "../errors/app-error";

import {
  attachCartToTransaction,
  findOpenCartItems,
  findTransactionById,
  insertTransaction,
} from "../repositories/transaction.repository";

const CHECKOUT_EXPIRATION_MS =
  24 * 60 * 60 * 1000;

type PricedCartItem = {
  harga: number;
  quantity: number;
};

function calculateTotalPrice(
  items: PricedCartItem[],
): number {
  return items.reduce(
    (
      currentTotal,
      item,
    ) =>
      currentTotal +
      item.harga *
      item.quantity,
    0,
  );
}

function createBillingCode():
  string {
  const uniqueCode =
    randomUUID()
      .slice(0, 8)
      .toUpperCase();

  return [
    "BILL",
    Date.now(),
    uniqueCode,
  ].join("-");
}

function createExpiredAt():
  Date {
  return new Date(
    Date.now() +
    CHECKOUT_EXPIRATION_MS,
  );
}

export async function checkout(
  buyerId: number,
) {
  const items =
    await findOpenCartItems(
      buyerId,
    );

  if (items.length === 0) {
    throw new AppError(
      "Cart is empty",
      422,
    );
  }

  const totalPrice =
    calculateTotalPrice(items);

  const billingCode =
    createBillingCode();

  const expiredAt =
    createExpiredAt();

  const connection =
    await database.getConnection();

  try {
    await connection.beginTransaction();

    const transactionId =
      await insertTransaction(
        connection,
        {
          billingCode,
          buyerId,
          totalPrice,
          expiredAt,
        },
      );

    await attachCartToTransaction(
      connection,
      buyerId,
      transactionId,
    );

    await connection.commit();

    return findTransactionById(
      transactionId,
    );
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}