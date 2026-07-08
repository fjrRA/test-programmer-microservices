import {
  CreditCard,
} from "lucide-react";

import {
  formatCurrency,
} from "../../../lib/format-currency";

type CartSummaryProps = {
  totalItems: number;
  totalPrice: number;
  isCheckingOut: boolean;
  checkoutDisabled: boolean;
  onCheckout: () => void;
};

export function CartSummary({
  totalItems,
  totalPrice,
  isCheckingOut,
  checkoutDisabled,
  onCheckout,
}: CartSummaryProps) {
  return (
    <aside
      className={[
        "h-fit rounded-2xl",
        "border border-slate-200",
        "bg-white p-6 shadow-sm",
      ].join(" ")}
    >
      <h2 className="text-xl font-bold">
        Ringkasan
      </h2>

      <div className="mt-6 space-y-4">
        <div
          className={[
            "flex justify-between",
            "text-slate-600",
          ].join(" ")}
        >
          <span>Total barang</span>
          <span>{totalItems}</span>
        </div>

        <div
          className={[
            "flex justify-between",
            "border-t border-slate-200",
            "pt-4 text-lg font-bold",
          ].join(" ")}
        >
          <span>Total</span>

          <span className="text-blue-700">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled={
          checkoutDisabled ||
          isCheckingOut
        }
        onClick={onCheckout}
        className={[
          "mt-6 inline-flex w-full",
          "items-center justify-center",
          "gap-2 rounded-xl",
          "bg-blue-700 px-5 py-3",
          "font-bold text-white",
          "hover:bg-blue-800",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
        ].join(" ")}
      >
        <CreditCard size={19} />

        {isCheckingOut
          ? "Memproses..."
          : "Checkout"}
      </button>
    </aside>
  );
}