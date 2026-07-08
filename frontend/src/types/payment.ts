export type PaymentItem = {
  id: number;
  buyerId: number;
  transactionId: number | null;
  productId: number;
  harga: number;
  quantity: number;
  subtotal?: number;
  createdAt: string;
};

export type PaymentTransaction = {
  id: number;
  billingCode: string;
  buyerId: number;
  totalPrice: number;
  status: string;
  displayStatus?: string;
  expiredAt: string;
  paidAt: string | null;
  createdAt: string;
  items?: PaymentItem[];
};