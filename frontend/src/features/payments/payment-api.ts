import {
  apiRequest,
} from "../../lib/api-client";

import type {
  PaymentTransaction,
} from "../../types/payment";

type PaymentListResponse = {
  success: boolean;
  data: PaymentTransaction[];
};

type PaymentUpdateResponse = {
  success: boolean;
  message: string;
  data: PaymentTransaction;
};

export async function getPayments():
  Promise<PaymentTransaction[]> {
  const response =
    await apiRequest<PaymentListResponse>(
      "/admin/transactions",
    );

  return response.data;
}

export async function payTransaction(
  transactionId: number,
): Promise<PaymentTransaction> {
  const response =
    await apiRequest<PaymentUpdateResponse>(
      `/transactions/${transactionId}/pay`,
      {
        method: "PUT",
      },
    );

  return response.data;
}