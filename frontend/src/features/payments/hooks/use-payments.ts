import {
  useEffect,
  useState,
} from "react";

import {
  getErrorMessage,
} from "../../../lib/get-error-message";

import type {
  PaymentTransaction,
} from "../../../types/payment";

import {
  getPayments,
  payTransaction,
} from "../payment-api";

export function usePayments() {
  const [
    payments,
    setPayments,
  ] = useState<PaymentTransaction[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    payingId,
    setPayingId,
  ] = useState<number | null>(null);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(
    () => {
      let isActive = true;

      getPayments()
        .then((data) => {
          if (isActive) {
            setPayments(data);
          }
        })
        .catch((caughtError: unknown) => {
          if (isActive) {
            setError(
              getErrorMessage(
                caughtError,
                "Gagal memuat data pembayaran.",
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

  async function refreshPayments():
    Promise<void> {
    setIsRefreshing(true);
    setError("");

    try {
      const data =
        await getPayments();

      setPayments(data);
    } catch (caughtError) {
      setError(
        getErrorMessage(
          caughtError,
          "Gagal memperbarui data pembayaran.",
        ),
      );
    } finally {
      setIsRefreshing(false);
    }
  }

  async function markAsPaid(
    transactionId: number,
  ): Promise<void> {
    setPayingId(transactionId);
    setError("");

    try {
      const updatedPayment =
        await payTransaction(
          transactionId,
        );

      setPayments(
        (currentPayments) =>
          currentPayments.map(
            (payment) =>
              payment.id === transactionId
                ? {
                  ...payment,
                  ...updatedPayment,

                  displayStatus:
                    updatedPayment.displayStatus ??
                    updatedPayment.status,
                }
                : payment,
          ),
      );
    } catch (caughtError) {
      setError(
        getErrorMessage(
          caughtError,
          "Gagal memperbarui status pembayaran.",
        ),
      );
    } finally {
      setPayingId(null);
    }
  }

  return {
    payments,
    isLoading,
    isRefreshing,
    payingId,
    error,
    refreshPayments,
    markAsPaid,
  };
}