import {
  useEffect,
  useState,
} from "react";

import {
  RefreshCw,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  TransactionTable,
} from "../features/transactions/components/transaction-table";

import {
  usePayTransaction,
} from "../features/transactions/hooks/use-pay-transaction";

import {
  useTransactions,
} from "../features/transactions/hooks/use-transactions";

import type {
  Transaction,
} from "../types/transaction";

type TransactionsLocationState = {
  successMessage?: string;
};

export function TransactionsPage() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const {
    transactions,
    isLoading,
    isRefreshing,
    error: transactionsError,
    refreshTransactions,
    replaceTransaction,
  } = useTransactions();

  const {
    payingTransactionId,
    paymentError,
    pay,
    clearPaymentError,
  } = usePayTransaction();

  const [
    successMessage,
    setSuccessMessage,
  ] = useState(() => {
    const locationState =
      location.state as
      TransactionsLocationState | null;

    return (
      locationState?.successMessage ??
      ""
    );
  });

  useEffect(
    () => {
      if (!location.state) {
        return;
      }

      navigate(
        location.pathname,
        {
          replace: true,
          state: null,
        },
      );
    },
    [
      location.pathname,
      location.state,
      navigate,
    ],
  );

  async function handlePay(
    transaction: Transaction,
  ): Promise<void> {
    const confirmed =
      window.confirm(
        [
          "Bayar transaksi ini?",
          "",
          `Billing code: ${transaction.billingCode}`,
        ].join("\n"),
      );

    if (!confirmed) {
      return;
    }

    setSuccessMessage("");
    clearPaymentError();

    const updatedTransaction =
      await pay(transaction.id);

    if (!updatedTransaction) {
      return;
    }

    replaceTransaction(
      updatedTransaction,
    );

    setSuccessMessage(
      `Pembayaran ${updatedTransaction.billingCode} berhasil dilakukan.`,
    );
  }

  return (
    <section className="mx-auto max-w-7xl">
      <header
        className={[
          "flex flex-col gap-5",
          "sm:flex-row",
          "sm:items-end",
          "sm:justify-between",
        ].join(" ")}
      >
        <div>
          <p
            className={[
              "text-xs font-bold",
              "tracking-[0.2em]",
              "text-blue-800",
            ].join(" ")}
          >
            TRANSAKSI
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-950">
            Riwayat Transaksi
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Daftar transaksi dan status
            pembayaran pembeli.
          </p>
        </div>

        <button
          type="button"
          disabled={isRefreshing}
          onClick={() => {
            void refreshTransactions();
          }}
          className={[
            "inline-flex items-center",
            "justify-center gap-2",
            "rounded-xl border",
            "border-slate-300",
            "bg-white px-5 py-3",
            "font-bold text-slate-900",
            "hover:bg-slate-50",
            "disabled:cursor-not-allowed",
            "disabled:opacity-60",
          ].join(" ")}
        >
          <RefreshCw
            size={18}
            className={
              isRefreshing
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </header>

      {successMessage && (
        <FeedbackAlert
          variant="success"
          message={successMessage}
        />
      )}

      {transactionsError && (
        <FeedbackAlert
          variant="error"
          message={transactionsError}
        />
      )}

      {paymentError && (
        <FeedbackAlert
          variant="error"
          message={paymentError}
        />
      )}

      <div className="mt-6">
        <TransactionTable
          transactions={transactions}
          isLoading={isLoading}
          payingTransactionId={
            payingTransactionId
          }
          onPay={(transaction) => {
            void handlePay(transaction);
          }}
        />
      </div>
    </section>
  );
}

type FeedbackAlertProps = {
  message: string;
  variant: "success" | "error";
};

function FeedbackAlert({
  message,
  variant,
}: FeedbackAlertProps) {
  const variantClasses =
    variant === "success"
      ? [
        "border-green-200",
        "bg-green-50",
        "text-green-700",
      ]
      : [
        "border-red-200",
        "bg-red-50",
        "text-red-700",
      ];

  return (
    <div
      role={
        variant === "error"
          ? "alert"
          : "status"
      }
      className={[
        "mt-6 rounded-xl border",
        "px-5 py-4",
        ...variantClasses,
      ].join(" ")}
    >
      {message}
    </div>
  );
}