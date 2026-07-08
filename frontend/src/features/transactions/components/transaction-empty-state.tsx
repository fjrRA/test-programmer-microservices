import {
  ReceiptText,
} from "lucide-react";

export function TransactionEmptyState() {
  return (
    <div className="px-6 py-16 text-center">
      <ReceiptText
        size={44}
        className="mx-auto text-slate-300"
      />

      <p className="mt-4 font-bold text-slate-900">
        Belum ada transaksi
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Transaksi akan tampil setelah
        kamu melakukan checkout.
      </p>
    </div>
  );
}