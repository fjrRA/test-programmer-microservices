import {
  useState,
} from "react";

import {
  PackagePlus,
  RefreshCw,
} from "lucide-react";

import {
  useAuth,
} from "../auth/use-auth";

import {
  ProductForm,
} from "../features/products/components/product-form";

import {
  ProductTable,
} from "../features/products/components/product-table";

import {
  useProducts,
} from "../features/products/hooks/use-products";

import type {
  Product,
  ProductInput,
} from "../types/product";

import {
  BuyerProductList,
} from "../features/products/components/buyer-product-list";

import {
  useAddToCart,
} from "../features/cart/hooks/use-add-to-cart";

export function ProductsPage() {
  const {
    session,
  } = useAuth();

  const {
    products,
    isLoading,
    error,
    setError,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
  } = useProducts();

  const {
    addingProductId,
    message: cartMessage,
    error: cartError,
    addProduct: addProductToCart,
  } = useAddToCart();

  const isAdmin =
    session?.user.role === "ADMIN";

  const [
    isFormOpen,
    setIsFormOpen,
  ] = useState(false);

  const [
    editingProduct,
    setEditingProduct,
  ] = useState<Product | null>(
    null,
  );

  const [
    deletingProductId,
    setDeletingProductId,
  ] = useState<number | null>(
    null,
  );

  function openCreateForm(): void {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function openEditForm(
    product: Product,
  ): void {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function closeForm(): void {
    setEditingProduct(null);
    setIsFormOpen(false);
  }

  async function handleSave(
    input: ProductInput,
  ): Promise<void> {
    if (editingProduct) {
      await editProduct(
        editingProduct.id,
        input,
      );
    } else {
      await addProduct(input);
    }

    closeForm();
  }

  async function handleDelete(
    product: Product,
  ): Promise<void> {
    const confirmed =
      window.confirm(
        `Hapus produk "${product.name}"?`,
      );

    if (!confirmed) {
      return;
    }

    setDeletingProductId(
      product.id,
    );

    setError("");

    try {
      await removeProduct(
        product.id,
      );
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Produk gagal dihapus.",
      );
    } finally {
      setDeletingProductId(
        null,
      );
    }
  }

  return (
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#174f97]">
            MANAGEMENT
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Data Produk
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin
              ? "Kelola data master produk."
              : "Lihat produk yang tersedia."}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              void loadProducts()
            }
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold"
          >
            <RefreshCw
              size={17}
              className={
                isLoading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          {isAdmin && (
            <button
              type="button"
              onClick={
                openCreateForm
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#174f97] px-4 py-2.5 text-sm font-bold text-white"
            >
              <PackagePlus size={17} />

              Tambah Produk
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!isAdmin && cartMessage && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {cartMessage}
        </div>
      )}

      {!isAdmin && cartError && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {cartError}
        </div>
      )}

      {isAdmin && isFormOpen && (
        <ProductForm
          key={
            editingProduct?.id ??
            "new-product"
          }
          product={editingProduct}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {isAdmin ? (
        <ProductTable
          products={products}
          isAdmin={isAdmin}
          isLoading={isLoading}
          deletingProductId={
            deletingProductId
          }
          onEdit={openEditForm}
          onDelete={(product) =>
            void handleDelete(product)
          }
        />
      ) : (
        <div className="mt-6">
          <BuyerProductList
            products={products}
            isLoading={isLoading}
            addingProductId={
              addingProductId
            }
            onAdd={addProductToCart}
          />
        </div>
      )}
    </section>
  );
}