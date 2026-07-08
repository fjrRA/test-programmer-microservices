export type TransactionStatus =
  | "BELUM_DIBAYAR"
  | "SUDAH_DIBAYAR";

export type Transaction = {
  id: number;
  billingCode: string;
  buyerId: number;
  totalPrice: number;
  status: TransactionStatus;
  expiredAt: string;
  paidAt: string | null;
  createdAt: string;
};

export type CheckoutTransaction =
  Transaction;