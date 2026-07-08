import {
  useState,
} from "react";

import {
  getErrorMessage,
} from "../../../lib/get-error-message";

import {
  addToCart,
} from "../cart-api";

export function useAddToCart() {
  const [
    addingProductId,
    setAddingProductId,
  ] = useState<number | null>(null);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  async function addProduct(
    productId: number,
    quantity: number,
  ): Promise<boolean> {
    setMessage("");
    setError("");

    if (
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      setError(
        "Jumlah produk minimal 1.",
      );

      return false;
    }

    setAddingProductId(productId);

    try {
      await addToCart({
        productId,
        quantity,
      });

      setMessage(
        "Produk berhasil ditambahkan ke keranjang.",
      );

      return true;
    } catch (caughtError) {
      setError(
        getErrorMessage(
          caughtError,
          "Gagal menambahkan produk ke keranjang.",
        ),
      );

      return false;
    } finally {
      setAddingProductId(null);
    }
  }

  function clearFeedback(): void {
    setMessage("");
    setError("");
  }

  return {
    addingProductId,
    message,
    error,
    addProduct,
    clearFeedback,
  };
}