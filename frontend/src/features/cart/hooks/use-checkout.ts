import {
  useState,
} from "react";

import {
  getErrorMessage,
} from "../../../lib/get-error-message";

import type {
  CheckoutTransaction,
} from "../../../types/transaction";

import {
  checkoutCart,
} from "../cart-api";

export function useCheckout() {
  const [
    isCheckingOut,
    setIsCheckingOut,
  ] = useState(false);

  const [
    checkoutError,
    setCheckoutError,
  ] = useState("");

  async function checkout():
    Promise<CheckoutTransaction | null> {
    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      return await checkoutCart();
    } catch (caughtError) {
      setCheckoutError(
        getErrorMessage(
          caughtError,
          "Checkout gagal dilakukan.",
        ),
      );

      return null;
    } finally {
      setIsCheckingOut(false);
    }
  }

  function clearCheckoutError(): void {
    setCheckoutError("");
  }

  return {
    isCheckingOut,
    checkoutError,
    checkout,
    clearCheckoutError,
  };
}