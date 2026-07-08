import {
  AppError,
} from "../errors/app-error";

import {
  findTransactionById,
  markTransactionPaid,
} from "../repositories/transaction.repository";

function isTransactionExpired(
  expiredAt: Date | string,
): boolean {
  return (
    new Date(expiredAt).getTime() <
    Date.now()
  );
}

export async function payTransaction(
  id: number,
  buyerId: number,
) {
  const transaction =
    await findTransactionById(id);

  if (
    !transaction ||
    transaction.buyerId !== buyerId
  ) {
    throw new AppError(
      "Transaction not found",
      404,
    );
  }

  if (
    transaction.status ===
    "SUDAH_DIBAYAR"
  ) {
    throw new AppError(
      "Transaction is already paid",
      409,
    );
  }

  if (
    isTransactionExpired(
      transaction.expiredAt,
    )
  ) {
    throw new AppError(
      "Transaction has expired",
      422,
    );
  }

  await markTransactionPaid(id);

  return findTransactionById(id);
}