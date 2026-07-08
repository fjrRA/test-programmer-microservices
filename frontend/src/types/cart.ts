export type CartItem = {
  id: number;
  buyerId: number;
  transactionId: number | null;
  productId: number;
  harga: number;
  quantity: number;
  createdAt: string;
  subtotal: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
};
