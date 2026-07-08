import {
  useState,
} from "react";

import {
  getErrorMessage,
} from "../../../lib/get-error-message";

import type {
  Transaction,
} from "../../../types/transaction";

import {
  payTransaction,
} from "../transaction-api";

export function usePayTransaction() {
  const [
    payingTransactionId,
    setPayingTransactionId,
  ] = useState<number | null>(null);

  const [
    paymentError,
    setPaymentError,
  ] = useState("");

  async function pay(
    transactionId: number,
  ): Promise<Transaction | null> {
    setPayingTransactionId(
      transactionId,
    );

    setPaymentError("");

    try {
      return await payTransaction(
        transactionId,
      );
    } catch (caughtError) {
      setPaymentError(
        getErrorMessage(
          caughtError,
          "Pembayaran transaksi gagal dilakukan.",
        ),
      );

      return null;
    } finally {
      setPayingTransactionId(null);
    }
  }

  function clearPaymentError(): void {
    setPaymentError("");
  }

  return {
    payingTransactionId,
    paymentError,
    pay,
    clearPaymentError,
  };
}