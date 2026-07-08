import {
  ShoppingCart,
} from "lucide-react";

import {
  formatCurrency,
} from "../../../lib/format-currency";

import type {
  CartItem,
} from "../../../types/cart";

type CartTableProps = {
  items: CartItem[];
  isLoading: boolean;
};

export function CartTable({
  items,
  isLoading,
}: CartTableProps) {
  return (
    <article
      className={[
        "overflow-hidden rounded-2xl",
        "border border-slate-200",
        "bg-white shadow-sm",
      ].join(" ")}
    >
      <header
        className={[
          "flex items-center gap-3",
          "border-b border-slate-200",
          "px-6 py-5",
        ].join(" ")}
      >
        <div
          className={[
            "flex size-12 items-center",
            "justify-center rounded-xl",
            "bg-blue-100 text-blue-700",
          ].join(" ")}
        >
          <ShoppingCart size={22} />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            Isi Keranjang
          </h2>

          <p className="text-sm text-slate-500">
            {items.length} jenis produk
          </p>
        </div>
      </header>

      {isLoading ? (
        <div className="px-6 py-16 text-center text-slate-500">
          Memuat keranjang...
        </div>
      ) : items.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <ShoppingCart
            size={42}
            className="mx-auto text-slate-300"
          />

          <p className="mt-4 font-bold text-slate-900">
            Keranjang masih kosong
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Tambahkan produk sebelum
            melakukan checkout.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr
                className={[
                  "text-left text-xs",
                  "uppercase text-slate-600",
                ].join(" ")}
              >
                <th className="px-6 py-4">
                  Produk
                </th>

                <th className="px-6 py-4">
                  Harga
                </th>

                <th className="px-6 py-4">
                  Jumlah
                </th>

                <th className="px-6 py-4">
                  Subtotal
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-200"
                >
                  <td className="px-6 py-5 font-bold">
                    Produk #{item.productId}
                  </td>

                  <td className="px-6 py-5">
                    {formatCurrency(
                      item.harga,
                    )}
                  </td>

                  <td className="px-6 py-5">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-5 font-bold">
                    {formatCurrency(
                      item.subtotal,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}