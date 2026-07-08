import {
  ReceiptText,
} from "lucide-react";

import {
  formatCurrency,
} from "../../../lib/format-currency";

import {
  formatDateTime,
} from "../../../lib/format-date-time";

import type {
  Transaction,
} from "../../../types/transaction";

import {
  TransactionEmptyState,
} from "./transaction-empty-state";

import {
  TransactionPaymentButton,
} from "./transaction-payment-button";

import {
  TransactionStatusBadge,
} from "./transaction-status-badge";

type TransactionTableProps = {
  transactions: Transaction[];
  isLoading: boolean;
  payingTransactionId: number | null;

  onPay: (
    transaction: Transaction,
  ) => void;
};

export function TransactionTable({
  transactions,
  isLoading,
  payingTransactionId,
  onPay,
}: TransactionTableProps) {
  return (
    <article
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
            "flex size-12 items-center",
            "justify-center rounded-xl",
            "bg-blue-100 text-blue-700",
          ].join(" ")}
        >
          <ReceiptText size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Daftar Transaksi
          </h2>

          <p className="text-sm text-slate-500">
            {transactions.length} transaksi
          </p>
        </div>
      </header>

      {isLoading ? (
        <div className="px-6 py-16 text-center text-slate-500">
          Memuat riwayat transaksi...
        </div>
      ) : transactions.length === 0 ? (
        <TransactionEmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-280">
            <thead className="bg-slate-50">
              <tr
                className={[
                  "text-left text-xs",
                  "uppercase text-slate-600",
                ].join(" ")}
              >
                <th className="px-6 py-4">
                  Billing Code
                </th>

                <th className="px-6 py-4">
                  Total
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Kedaluwarsa
                </th>

                <th className="px-6 py-4">
                  Dibayar
                </th>

                <th className="px-6 py-4">
                  Dibuat
                </th>

                <th className="px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(
                (transaction) => {
                  const isPaid =
                    transaction.status ===
                    "SUDAH_DIBAYAR";

                  const isPaying =
                    payingTransactionId ===
                    transaction.id;

                  return (
                    <tr
                      key={transaction.id}
                      className={[
                        "border-t",
                        "border-slate-200",
                      ].join(" ")}
                    >
                      <td
                        className={[
                          "px-6 py-5",
                          "font-mono text-sm",
                          "font-bold text-slate-900",
                        ].join(" ")}
                      >
                        {
                          transaction
                            .billingCode
                        }
                      </td>

                      <td
                        className={[
                          "px-6 py-5",
                          "font-bold",
                          "text-slate-900",
                        ].join(" ")}
                      >
                        {formatCurrency(
                          transaction.totalPrice,
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <TransactionStatusBadge
                          status={
                            transaction.status
                          }
                        />
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {formatDateTime(
                          transaction.expiredAt,
                        )}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {formatDateTime(
                          transaction.paidAt,
                        )}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {formatDateTime(
                          transaction.createdAt,
                        )}
                      </td>

                      <td className="px-6 py-5">
                        {isPaid ? (
                          <span className="text-sm font-semibold text-slate-500">
                            Selesai
                          </span>
                        ) : (
                          <TransactionPaymentButton
                            isLoading={
                              isPaying
                            }
                            onClick={() => {
                              onPay(
                                transaction,
                              );
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}