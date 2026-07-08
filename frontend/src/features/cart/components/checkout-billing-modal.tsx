import {
  useEffect,
} from "react";

import {
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";

import {
  formatCurrency,
} from "../../../lib/format-currency";

import {
  formatDateTime,
} from "../../../lib/format-date-time";

import type {
  CheckoutTransaction,
} from "../../../types/transaction";

type CheckoutBillingModalProps = {
  transaction:
  CheckoutTransaction | null;

  onClose: () => void;
};

const paymentInstructions = [
  "Buka aplikasi mobile banking atau layanan pembayaran yang tersedia.",
  "Pilih menu pembayaran atau transfer sesuai layanan yang digunakan.",
  "Masukkan kode billing yang tertera pada informasi transaksi.",
  "Periksa kembali nominal pembayaran sebelum melanjutkan.",
  "Simpan bukti pembayaran setelah transaksi berhasil.",
];

export function CheckoutBillingModal({
  transaction,
  onClose,
}: CheckoutBillingModalProps) {
  const isOpen =
    transaction !== null;

  useEffect(
    () => {
      if (!isOpen) {
        return;
      }

      const previousOverflow =
        document.body.style.overflow;

      function handleKeyDown(
        event: KeyboardEvent,
      ): void {
        if (event.key === "Escape") {
          onClose();
        }
      }

      document.body.style.overflow =
        "hidden";

      window.addEventListener(
        "keydown",
        handleKeyDown,
      );

      return () => {
        document.body.style.overflow =
          previousOverflow;

        window.removeEventListener(
          "keydown",
          handleKeyDown,
        );
      };
    },
    [
      isOpen,
      onClose,
    ],
  );

  if (!transaction) {
    return null;
  }

  return (
    <div
      className={[
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "p-4 sm:p-6",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0",
          "bg-slate-950/60",
          "backdrop-blur-[1px]",
        ].join(" ")}
        aria-hidden="true"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="billing-modal-title"
        className={[
          "relative z-10",
          "max-h-[90vh] w-full",
          "max-w-2xl overflow-y-auto",
          "rounded-2xl bg-white",
          "shadow-2xl",
        ].join(" ")}
      >
        <header
          className={[
            "flex items-center",
            "justify-between gap-4",
            "rounded-t-2xl",
            "bg-emerald-700",
            "px-6 py-5 text-white",
          ].join(" ")}
        >
          <div
            className={[
              "flex items-center gap-3",
            ].join(" ")}
          >
            <FileText size={22} />

            <h2
              id="billing-modal-title"
              className="text-xl font-bold"
            >
              Kode Billing
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className={[
              "rounded-lg p-2",
              "text-emerald-100",
              "hover:bg-emerald-600",
              "hover:text-white",
            ].join(" ")}
          >
            <X size={22} />
          </button>
        </header>

        <div className="p-6">
          <div
            role="status"
            className={[
              "rounded-xl border",
              "border-emerald-200",
              "bg-emerald-50",
              "px-5 py-4",
              "text-emerald-800",
            ].join(" ")}
          >
            <div
              className={[
                "flex items-start gap-3",
              ].join(" ")}
            >
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-bold">
                  Billing Berhasil Dibuat
                </p>

                <p className="mt-1 text-sm">
                  Berikut informasi kode
                  billing untuk transaksi
                  yang baru dibuat.
                </p>
              </div>
            </div>
          </div>

          <dl
            className={[
              "mt-5 overflow-hidden",
              "rounded-xl border",
              "border-slate-200",
            ].join(" ")}
          >
            <BillingDetailRow
              label="Kode Billing"
              value={
                transaction.billingCode
              }
              emphasize
            />

            <BillingDetailRow
              label="Nominal"
              value={formatCurrency(
                transaction.totalPrice,
              )}
            />

            <BillingDetailRow
              label="Tanggal Kedaluwarsa"
              value={formatDateTime(
                transaction.expiredAt,
              )}
            />
          </dl>

          <div className="mt-6">
            <h3
              className={[
                "font-bold text-blue-700",
              ].join(" ")}
            >
              Tata Cara Pembayaran
            </h3>

            <ol
              className={[
                "mt-3 list-decimal",
                "space-y-2 pl-5",
                "text-sm leading-6",
                "text-slate-600",
              ].join(" ")}
            >
              {paymentInstructions.map(
                (instruction) => (
                  <li key={instruction}>
                    {instruction}
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>

        <footer
          className={[
            "flex justify-end",
            "border-t border-slate-200",
            "px-6 py-4",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={onClose}
            className={[
              "inline-flex items-center",
              "justify-center gap-2",
              "rounded-lg",
              "bg-emerald-700",
              "px-5 py-2.5",
              "font-bold text-white",
              "hover:bg-emerald-800",
            ].join(" ")}
          >
            <CheckCircle2 size={18} />
            Selesai
          </button>
        </footer>
      </section>
    </div>
  );
}

type BillingDetailRowProps = {
  label: string;
  value: string;
  emphasize?: boolean;
};

function BillingDetailRow({
  label,
  value,
  emphasize = false,
}: BillingDetailRowProps) {
  return (
    <div
      className={[
        "grid",
        "border-b border-slate-200",
        "last:border-b-0",
        "sm:grid-cols-[220px_minmax(0,1fr)]",
      ].join(" ")}
    >
      <dt
        className={[
          "bg-slate-50",
          "px-4 py-3",
          "font-bold text-slate-800",
        ].join(" ")}
      >
        {label}
      </dt>

      <dd
        className={[
          "break-all px-4 py-3",
          emphasize
            ? [
              "font-mono",
              "font-bold",
              "text-slate-950",
            ].join(" ")
            : "text-slate-700",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}