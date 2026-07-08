type PaymentStatusBadgeProps = {
  status: string;
};

function getStatusLabel(
  status: string,
): string {
  switch (status) {
    case "BELUM_DIBAYAR":
      return "Belum Dibayar";

    case "SUDAH_DIBAYAR":
      return "Sudah Dibayar";

    case "KEDALUWARSA":
    case "EXPIRED":
      return "Kedaluwarsa";

    default:
      return status.replaceAll(
        "_",
        " ",
      );
  }
}

function getStatusClassName(
  status: string,
): string {
  switch (status) {
    case "BELUM_DIBAYAR":
      return (
        "bg-amber-100 " +
        "text-amber-700"
      );

    case "SUDAH_DIBAYAR":
      return (
        "bg-emerald-100 " +
        "text-emerald-700"
      );

    case "KEDALUWARSA":
    case "EXPIRED":
      return (
        "bg-red-100 " +
        "text-red-700"
      );

    default:
      return (
        "bg-slate-100 " +
        "text-slate-700"
      );
  }
}

export function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex rounded-full",
        "px-3 py-1",
        "text-xs font-bold",
        getStatusClassName(status),
      ].join(" ")}
    >
      {getStatusLabel(status)}
    </span>
  );
}