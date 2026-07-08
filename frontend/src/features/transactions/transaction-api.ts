import {
  apiRequest,
} from "../../lib/api-client";

import type {
  Transaction,
} from "../../types/transaction";

type TransactionsResponse = {
  success: boolean;
  data: Transaction[];
};

type PayTransactionResponse = {
  success: boolean;
  message: string;
  data: Transaction;
};

export async function getTransactions():
  Promise<Transaction[]> {
  const response =
    await apiRequest<TransactionsResponse>(
      "/transactions",
    );

  return response.data;
}

export async function payTransaction(
  transactionId: number,
): Promise<Transaction> {
  const response =
    await apiRequest<PayTransactionResponse>(
      `/transactions/${transactionId}/pay`,
      {
        method: "PUT",
      },
    );

  return response.data;
}