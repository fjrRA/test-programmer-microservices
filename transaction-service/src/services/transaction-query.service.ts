import {
  findAllTransactions,
  findTransactionItems,
  findTransactionsByBuyer,
} from "../repositories/transaction.repository";

import type {
  Transaction,
} from "../repositories/transaction.repository";

type TransactionDisplayStatus =
  | Transaction["status"]
  | "EXPIRED";

function resolveDisplayStatus(
  transaction: Transaction,
): TransactionDisplayStatus {
  const isExpired =
    transaction.status ===
    "BELUM_DIBAYAR" &&
    new Date(
      transaction.expiredAt,
    ).getTime() <
    Date.now();

  return isExpired
    ? "EXPIRED"
    : transaction.status;
}

async function mapTransactionDetails(
  transaction: Transaction,
) {
  const items =
    await findTransactionItems(
      transaction.id,
    );

  return {
    ...transaction,

    displayStatus:
      resolveDisplayStatus(
        transaction,
      ),

    items,
  };
}

export async function getHistory(
  buyerId: number,
) {
  const transactions =
    await findTransactionsByBuyer(
      buyerId,
    );

  return Promise.all(
    transactions.map(
      mapTransactionDetails,
    ),
  );
}

export async function getAllTransactions() {
  return findAllTransactions();
}