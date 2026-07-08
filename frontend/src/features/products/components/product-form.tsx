import {
  useState
} from "react";

import type {
  FormEvent,
} from "react";

import {
  Save,
  X,
} from "lucide-react";

import type {
  Product,
  ProductInput,
} from "../../../types/product";

type ProductFormProps = {
  product: Product | null;

  onSave: (
    input: ProductInput,
  ) => Promise<void>;

  onCancel: () => void;
};

export function ProductForm({
  product,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [
    name,
    setName,
  ] = useState(
    () => product?.name ?? "",
  );

  const [
    harga,
    setHarga,
  ] = useState(
    () =>
      product
        ? String(product.harga)
        : "",
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const normalizedName =
      name.trim();

    const normalizedPrice =
      Number(harga);

    if (
      normalizedName.length < 2
    ) {
      setError(
        "Nama produk minimal 2 karakter.",
      );

      return;
    }

    if (
      !Number.isFinite(
        normalizedPrice,
      ) ||
      normalizedPrice <= 0
    ) {
      setError(
        "Harga harus lebih dari 0.",
      );

      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onSave({
        name: normalizedName,
        harga: normalizedPrice,
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Produk gagal disimpan.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className="mt-6 rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {product
              ? "Edit Produk"
              : "Tambah Produk"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Isi nama dan harga produk.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Tutup formulir"
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-5 md:grid-cols-2"
      >
        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Nama produk
          </span>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value,
              )
            }
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#174f97] focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Harga
          </span>

          <input
            type="number"
            value={harga}
            onChange={(event) =>
              setHarga(
                event.target.value,
              )
            }
            min="1"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#174f97] focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-[#174f97] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60"
          >
            <Save size={17} />

            {isSubmitting
              ? "Menyimpan..."
              : "Simpan"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700"
          >
            Batal
          </button>
        </div>
      </form>
    </article>
  );
}