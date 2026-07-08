import {
  CreditCard,
  LoaderCircle,
} from "lucide-react";

type TransactionPaymentButtonProps = {
  isLoading: boolean;
  onClick: () => void;
};

export function TransactionPaymentButton({
  isLoading,
  onClick,
}: TransactionPaymentButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={onClick}
      className={[
        "inline-flex items-center",
        "justify-center gap-2",
        "rounded-lg bg-blue-700",
        "px-4 py-2",
        "text-sm font-bold text-white",
        "hover:bg-blue-800",
        "disabled:cursor-not-allowed",
        "disabled:opacity-60",
      ].join(" ")}
    >
      {isLoading ? (
        <LoaderCircle
          size={16}
          className="animate-spin"
        />
      ) : (
        <CreditCard size={16} />
      )}

      {isLoading
        ? "Memproses..."
        : "Bayar"}
    </button>
  );
}