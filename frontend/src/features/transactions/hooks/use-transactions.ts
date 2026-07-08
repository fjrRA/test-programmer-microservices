import {
  useEffect,
  useState,
} from "react";

import {
  getErrorMessage,
} from "../../../lib/get-error-message";

import type {
  Transaction,
} from "../../../types/transaction";

import {
  getTransactions,
} from "../transaction-api";

export function useTransactions() {
  const [
    transactions,
    setTransactions,
  ] = useState<Transaction[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(
    () => {
      let isActive = true;

      getTransactions()
        .then((data: Transaction[]) => {
          if (isActive) {
            setTransactions(data);
          }
        })
        .catch((caughtError: unknown) => {
          if (isActive) {
            setError(
              getErrorMessage(
                caughtError,
                "Gagal memuat riwayat transaksi.",
              ),
            );
          }
        })
        .finally(() => {
          if (isActive) {
            setIsLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    },
    [],
  );

  async function refreshTransactions():
    Promise<void> {
    setIsRefreshing(true);
    setError("");

    try {
      const data =
        await getTransactions();

      setTransactions(data);
    } catch (caughtError) {
      setError(
        getErrorMessage(
          caughtError,
          "Gagal memperbarui riwayat transaksi.",
        ),
      );
    } finally {
      setIsRefreshing(false);
    }
  }

  function replaceTransaction(
    updatedTransaction: Transaction,
  ): void {
    setTransactions(
      (currentTransactions) =>
        currentTransactions.map(
          (transaction) =>
            transaction.id ===
              updatedTransaction.id
              ? updatedTransaction
              : transaction,
        ),
    );
  }

  return {
    transactions,
    isLoading,
    isRefreshing,
    error,
    refreshTransactions,
    replaceTransaction,
  };
}