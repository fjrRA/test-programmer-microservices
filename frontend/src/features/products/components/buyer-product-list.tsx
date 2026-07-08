import {
  PackageOpen,
} from "lucide-react";

import type {
  Product,
} from "../../../types/product";

import {
  BuyerProductCard,
} from "./buyer-product-card";

type BuyerProductListProps = {
  products: Product[];
  isLoading: boolean;
  addingProductId: number | null;

  onAdd: (
    productId: number,
    quantity: number,
  ) => Promise<boolean>;
};

export function BuyerProductList({
  products,
  isLoading,
  addingProductId,
  onAdd,
}: BuyerProductListProps) {
  if (isLoading) {
    return (
      <div
        className={[
          "rounded-2xl border",
          "border-slate-200",
          "bg-white p-10",
          "text-center",
          "text-slate-600",
        ].join(" ")}
      >
        Memuat produk...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className={[
          "rounded-2xl border",
          "border-slate-200",
          "bg-white p-12",
          "text-center",
        ].join(" ")}
      >
        <PackageOpen
          size={42}
          className={[
            "mx-auto",
            "text-slate-300",
          ].join(" ")}
        />

        <h2
          className={[
            "mt-4 text-lg",
            "font-extrabold",
            "text-slate-950",
          ].join(" ")}
        >
          Belum ada produk
        </h2>

        <p className="mt-2 text-slate-600">
          Produk belum tersedia.
        </p>
      </div>
    );
  }

  return (
    <div
      className={[
        "grid gap-5",
        "md:grid-cols-2",
        "xl:grid-cols-3",
      ].join(" ")}
    >
      {products.map(
        (product) => (
          <BuyerProductCard
            key={product.id}
            product={product}
            isAdding={
              addingProductId ===
              product.id
            }
            onAdd={onAdd}
          />
        ),
      )}
    </div>
  );
}