import {
  LoaderCircle,
  ReceiptText,
} from "lucide-react";

import type {
  PaymentTransaction,
} from "../../../types/payment";

import {
  formatPaymentDate,
  formatPaymentPrice,
} from "../payment-format";

import {
  PaymentStatusBadge,
} from "./payment-status-badge";

type PaymentTableProps = {
  payments: PaymentTransaction[];
  isLoading: boolean;
  payingId: number | null;

  onPay: (
    payment: PaymentTransaction,
  ) => void;
};

export function PaymentTable({
  payments,
  isLoading,
  payingId,
  onPay,
}: PaymentTableProps) {
  return (
    <section
      className={[
        "overflow-hidden rounded-2xl",
        "border border-slate-200",
        "bg-white shadow-sm",
      ].join(" ")}
    >
      <header
        className={[
          "flex items-center gap-3",
          "border-b border-slate-200",
          "px-6 py-5",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-12 w-12",
            "items-center justify-center",
            "rounded-xl bg-blue-100",
            "text-blue-700",
          ].join(" ")}
        >
          <ReceiptText size={23} />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Daftar Pembayaran
          </h2>

          <p className="text-sm text-slate-500">
            {payments.length} transaksi ditemukan
          </p>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-275 w-full">
          <thead className="bg-slate-50">
            <tr
              className={[
                "text-left text-xs",
                "font-bold uppercase",
                "text-slate-600",
              ].join(" ")}
            >
              <th className="px-6 py-4">
                ID
              </th>

              <th className="px-6 py-4">
                Billing Code
              </th>

              <th className="px-6 py-4">
                Buyer ID
              </th>

              <th className="px-6 py-4">
                Total
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Dibuat
              </th>

              <th className="px-6 py-4">
                Dibayar
              </th>

              <th className="px-6 py-4">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-16"
                >
                  <div
                    className={[
                      "flex items-center",
                      "justify-center gap-3",
                      "text-slate-500",
                    ].join(" ")}
                  >
                    <LoaderCircle
                      className="animate-spin"
                      size={22}
                    />

                    Memuat pembayaran...
                  </div>
                </td>
              </tr>
            )}

            {!isLoading &&
              payments.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className={[
                      "px-6 py-16",
                      "text-center text-slate-500",
                    ].join(" ")}
                  >
                    Belum ada transaksi.
                  </td>
                </tr>
              )}

            {!isLoading &&
              payments.map((payment) => {
                const displayStatus =
                  payment.displayStatus ??
                  payment.status;

                const canPay =
                  displayStatus ===
                  "BELUM_DIBAYAR";

                const isPaying =
                  payingId === payment.id;

                return (
                  <tr
                    key={payment.id}
                    className={[
                      "border-t",
                      "border-slate-200",
                    ].join(" ")}
                  >
                    <td className="px-6 py-5 text-slate-600">
                      #{payment.id}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      {payment.billingCode}
                    </td>

                    <td className="px-6 py-5">
                      #{payment.buyerId}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      {formatPaymentPrice(
                        payment.totalPrice,
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <PaymentStatusBadge
                        status={displayStatus}
                      />
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {formatPaymentDate(
                        payment.createdAt,
                      )}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {formatPaymentDate(
                        payment.paidAt,
                      )}
                    </td>

                    <td className="px-6 py-5">
                      {canPay ? (
                        <button
                          type="button"
                          disabled={
                            payingId !== null
                          }
                          onClick={() =>
                            onPay(payment)
                          }
                          className={[
                            "rounded-lg",
                            "bg-blue-700",
                            "px-4 py-2",
                            "text-sm font-bold",
                            "text-white",
                            "hover:bg-blue-800",
                            "disabled:cursor-not-allowed",
                            "disabled:opacity-60",
                          ].join(" ")}
                        >
                          {isPaying
                            ? "Memproses..."
                            : "Tandai Dibayar"}
                        </button>
                      ) : (
                        <span className="text-slate-400">
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}