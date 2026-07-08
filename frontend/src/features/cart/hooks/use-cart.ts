import {
  useEffect,
  useState,
} from "react";

import {
  getErrorMessage,
} from "../../../lib/get-error-message";

import type {
  Cart,
} from "../../../types/cart";

import {
  getCart,
} from "../cart-api";

const emptyCart: Cart = {
  items: [],
  total: 0,
};

export function useCart() {
  const [
    cart,
    setCart,
  ] = useState<Cart>(emptyCart);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(
    () => {
      let isActive = true;

      getCart()
        .then((data) => {
          if (isActive) {
            setCart(data);
          }
        })
        .catch((caughtError: unknown) => {
          if (isActive) {
            setError(
              getErrorMessage(
                caughtError,
                "Gagal memuat keranjang.",
              ),
            );
          }
        })
        .finally(() => {
          if (isActive) {
            setIsLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    },
    [],
  );

  async function refreshCart():
    Promise<void> {
    setIsRefreshing(true);
    setError("");

    try {
      const data =
        await getCart();

      setCart(data);
    } catch (caughtError) {
      setError(
        getErrorMessage(
          caughtError,
          "Gagal memperbarui keranjang.",
        ),
      );
    } finally {
      setIsRefreshing(false);
    }
  }

  return {
    cart,
    isLoading,
    isRefreshing,
    error,
    refreshCart,
  };
}