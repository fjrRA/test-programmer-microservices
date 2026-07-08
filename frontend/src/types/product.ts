export type Product = {
  id: number;
  name: string;
  harga: number;
  createdAt: string;
};

export type ProductInput = {
  name: string;
  harga: number;
};