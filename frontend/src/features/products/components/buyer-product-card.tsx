import {
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  Product,
} from "../../../types/product";

type BuyerProductCardProps = {
  product: Product;
  isAdding: boolean;

  onAdd: (
    productId: number,
    quantity: number,
  ) => Promise<boolean>;
};

const rupiahFormatter =
  new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  );

export function BuyerProductCard({
  product,
  isAdding,
  onAdd,
}: BuyerProductCardProps) {
  const [
    quantity,
    setQuantity,
  ] = useState(1);

  function decreaseQuantity(): void {
    setQuantity(
      (currentQuantity) =>
        Math.max(
          1,
          currentQuantity - 1,
        ),
    );
  }

  function increaseQuantity(): void {
    setQuantity(
      (currentQuantity) =>
        currentQuantity + 1,
    );
  }

  async function handleAdd(): Promise<void> {
    const isSuccessful =
      await onAdd(
        product.id,
        quantity,
      );

    if (isSuccessful) {
      setQuantity(1);
    }
  }

  return (
    <article
      className={[
        "rounded-2xl border",
        "border-slate-200",
        "bg-white p-6",
        "shadow-sm",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 w-12",
          "items-center justify-center",
          "rounded-xl",
          "bg-blue-100",
          "text-blue-700",
        ].join(" ")}
      >
        <ShoppingCart size={22} />
      </div>

      <h2
        className={[
          "mt-5 text-xl",
          "font-extrabold",
          "text-slate-950",
        ].join(" ")}
      >
        {product.name}
      </h2>

      <p
        className={[
          "mt-2 text-lg",
          "font-bold",
          "text-blue-800",
        ].join(" ")}
      >
        {rupiahFormatter.format(
          product.harga,
        )}
      </p>

      <div className="mt-6">
        <p
          className={[
            "mb-2 text-sm",
            "font-bold",
            "text-slate-700",
          ].join(" ")}
        >
          Jumlah
        </p>

        <div
          className={[
            "flex items-center",
            "gap-3",
          ].join(" ")}
        >
          <button
            type="button"
            disabled={
              isAdding ||
              quantity === 1
            }
            onClick={decreaseQuantity}
            className={[
              "flex h-10 w-10",
              "items-center justify-center",
              "rounded-lg border",
              "border-slate-300",
              "bg-white",
              "hover:bg-slate-50",
              "disabled:cursor-not-allowed",
              "disabled:opacity-50",
            ].join(" ")}
          >
            <Minus size={17} />
          </button>

          <input
            type="number"
            min={1}
            value={quantity}
            disabled={isAdding}
            onChange={(event) => {
              const nextQuantity =
                Number(
                  event.target.value,
                );

              setQuantity(
                Number.isFinite(
                  nextQuantity,
                )
                  ? nextQuantity
                  : 1,
              );
            }}
            className={[
              "h-10 w-20",
              "rounded-lg border",
              "border-slate-300",
              "text-center",
              "font-bold",
              "outline-none",
              "focus:border-blue-500",
              "focus:ring-2",
              "focus:ring-blue-100",
            ].join(" ")}
          />

          <button
            type="button"
            disabled={isAdding}
            onClick={increaseQuantity}
            className={[
              "flex h-10 w-10",
              "items-center justify-center",
              "rounded-lg border",
              "border-slate-300",
              "bg-white",
              "hover:bg-slate-50",
              "disabled:cursor-not-allowed",
              "disabled:opacity-50",
            ].join(" ")}
          >
            <Plus size={17} />
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={isAdding}
        onClick={() => {
          void handleAdd();
        }}
        className={[
          "mt-6 inline-flex",
          "w-full items-center",
          "justify-center gap-2",
          "rounded-xl",
          "bg-blue-700",
          "px-5 py-3",
          "font-bold text-white",
          "hover:bg-blue-800",
          "disabled:cursor-not-allowed",
          "disabled:opacity-60",
        ].join(" ")}
      >
        <ShoppingCart size={18} />

        {isAdding
          ? "Menambahkan..."
          : "Tambah ke Keranjang"}
      </button>
    </article>
  );
}