import {
  Package,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";

import type {
  Product,
} from "../../../types/product";

type ProductTableProps = {
  products: Product[];
  isAdmin: boolean;
  isLoading: boolean;
  deletingProductId: number | null;

  onEdit: (
    product: Product,
  ) => void;

  onDelete: (
    product: Product,
  ) => void;
};

function formatRupiah(
  value: number,
): string {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

export function ProductTable({
  products,
  isAdmin,
  isLoading,
  deletingProductId,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <article className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-100 text-[#174f97]">
          <Package size={20} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900">
            Daftar Produk
          </h2>

          <p className="text-xs text-slate-500">
            {products.length} produk ditemukan
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-72 items-center justify-center">
          <RefreshCw className="animate-spin text-[#174f97]" />
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-72 items-center justify-center text-center">
          <div>
            <Package
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              Belum ada produk
            </h3>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4">
                  ID
                </th>

                <th className="px-6 py-4">
                  Nama
                </th>

                <th className="px-6 py-4">
                  Harga
                </th>

                <th className="px-6 py-4">
                  Dibuat
                </th>

                {isAdmin && (
                  <th className="px-6 py-4 text-right">
                    Aksi
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {products.map(
                (product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500">
                      #{product.id}
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {product.name}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold">
                      {formatRupiah(
                        Number(
                          product.harga,
                        ),
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(
                        product.createdAt,
                      ).toLocaleDateString(
                        "id-ID",
                      )}
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onEdit(product)
                            }
                            className="rounded-lg bg-blue-50 p-2 text-[#174f97]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onDelete(product)
                            }
                            disabled={
                              deletingProductId ===
                              product.id
                            }
                            className="rounded-lg bg-red-50 p-2 text-red-700 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}