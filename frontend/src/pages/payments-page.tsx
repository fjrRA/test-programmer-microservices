import {
  RefreshCw,
} from "lucide-react";

import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../auth/use-auth";

import {
  PaymentTable,
} from "../features/payments/components/payment-table";

import {
  usePayments,
} from "../features/payments/hooks/use-payments";

import type {
  PaymentTransaction,
} from "../types/payment";

export function PaymentsPage() {
  const {
    session,
  } = useAuth();

  if (
    session?.user.role !== "ADMIN"
  ) {
    return (
      <Navigate
        to="/app"
        replace
      />
    );
  }

  return <AdminPaymentsContent />;
}

function AdminPaymentsContent() {
  const {
    payments,
    isLoading,
    isRefreshing,
    payingId,
    error,
    refreshPayments,
    markAsPaid,
  } = usePayments();

  function handlePay(
    payment: PaymentTransaction,
  ): void {
    const confirmed =
      window.confirm(
        `Tandai transaksi "${payment.billingCode}" sebagai sudah dibayar?`,
      );

    if (!confirmed) {
      return;
    }

    void markAsPaid(payment.id);
  }

  return (
    <section className="space-y-6">
      <header
        className={[
          "flex flex-col gap-4",
          "lg:flex-row",
          "lg:items-end",
          "lg:justify-between",
        ].join(" ")}
      >
        <div>
          <p
            className={[
              "text-sm font-bold",
              "uppercase tracking-[0.2em]",
              "text-blue-800",
            ].join(" ")}
          >
            Management
          </p>

          <h1
            className={[
              "mt-2 text-4xl",
              "font-extrabold",
              "text-slate-950",
            ].join(" ")}
          >
            Pembayaran
          </h1>

          <p className="mt-2 text-slate-600">
            Kelola dan perbarui status
            transaksi pembeli.
          </p>
        </div>

        <button
          type="button"
          disabled={isRefreshing}
          onClick={() => {
            void refreshPayments();
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
            size={19}
            className={
              isRefreshing
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>
      </header>

      {error && (
        <div
          className={[
            "rounded-xl border",
            "border-red-200",
            "bg-red-50",
            "px-5 py-4",
            "text-red-700",
          ].join(" ")}
        >
          {error}
        </div>
      )}

      <PaymentTable
        payments={payments}
        isLoading={isLoading}
        payingId={payingId}
        onPay={handlePay}
      />
    </section>
  );
}