import type {
  TransactionStatus,
} from "../../../types/transaction";

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
};

export function TransactionStatusBadge({
  status,
}: TransactionStatusBadgeProps) {
  const isPaid =
    status === "SUDAH_DIBAYAR";

  return (
    <span
      className={[
        "inline-flex rounded-full",
        "px-3 py-1",
        "text-xs font-bold",
        isPaid
          ? [
            "bg-green-100",
            "text-green-700",
          ].join(" ")
          : [
            "bg-amber-100",
            "text-amber-700",
          ].join(" "),
      ].join(" ")}
    >
      {isPaid
        ? "Sudah Dibayar"
        : "Belum Dibayar"}
    </span>
  );
}