import {
  useState,
} from "react";

import {
  RefreshCw,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  CartSummary,
} from "../features/cart/components/cart-summary";

import {
  CartTable,
} from "../features/cart/components/cart-table";

import {
  CheckoutBillingModal,
} from "../features/cart/components/checkout-billing-modal";

import {
  useCart,
} from "../features/cart/hooks/use-cart";

import {
  useCheckout,
} from "../features/cart/hooks/use-checkout";

import type {
  CheckoutTransaction,
} from "../types/transaction";

export function CartPage() {
  const navigate =
    useNavigate();

  const [
    billingTransaction,
    setBillingTransaction,
  ] =
    useState<CheckoutTransaction | null>(
      null,
    );

  const {
    cart,
    isLoading,
    isRefreshing,
    error: cartError,
    refreshCart,
  } = useCart();

  const {
    isCheckingOut,
    checkoutError,
    checkout,
  } = useCheckout();

  const totalItems =
    cart.items.reduce(
      (
        currentTotal,
        item,
      ) =>
        currentTotal +
        item.quantity,
      0,
    );

  async function handleCheckout():
    Promise<void> {
    const transaction =
      await checkout();

    if (!transaction) {
      return;
    }

    setBillingTransaction(
      transaction,
    );
  }

  function handleCloseBillingModal():
    void {
    if (!billingTransaction) {
      return;
    }

    const billingCode =
      billingTransaction.billingCode;

    setBillingTransaction(null);

    navigate(
      "/app/transactions",
      {
        state: {
          successMessage:
            `Checkout berhasil. Kode billing: ${billingCode}`,
        },
      },
    );
  }

  return (
    <>
      <section className="mx-auto max-w-7xl">
        <header
          className={[
            "flex flex-col gap-5",
            "sm:flex-row",
            "sm:items-end",
            "sm:justify-between",
          ].join(" ")}
        >
          <div>
            <p
              className={[
                "text-xs font-bold",
                "tracking-[0.2em]",
                "text-blue-800",
              ].join(" ")}
            >
              TRANSAKSI
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-950">
              Keranjang
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Periksa produk sebelum
              melakukan checkout.
            </p>
          </div>

          <button
            type="button"
            disabled={isRefreshing}
            onClick={() => {
              void refreshCart();
            }}
            className={[
              "inline-flex items-center",
              "justify-center gap-2",
              "rounded-xl border",
              "border-slate-300",
              "bg-white px-5 py-3",
              "font-bold text-slate-900",
              "hover:bg-slate-50",
              "disabled:cursor-not-allowed",
              "disabled:opacity-60",
            ].join(" ")}
          >
            <RefreshCw
              size={18}
              className={
                isRefreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </header>

        {cartError && (
          <ErrorAlert
            message={cartError}
          />
        )}

        {checkoutError && (
          <ErrorAlert
            message={checkoutError}
          />
        )}

        <div
          className={[
            "mt-6 grid gap-6",
            "lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]",
          ].join(" ")}
        >
          <CartTable
            items={cart.items}
            isLoading={isLoading}
          />

          <CartSummary
            totalItems={totalItems}
            totalPrice={cart.total}
            isCheckingOut={
              isCheckingOut
            }
            checkoutDisabled={
              cart.items.length === 0
            }
            onCheckout={() => {
              void handleCheckout();
            }}
          />
        </div>
      </section>

      <CheckoutBillingModal
        transaction={
          billingTransaction
        }
        onClose={
          handleCloseBillingModal
        }
      />
    </>
  );
}

type ErrorAlertProps = {
  message: string;
};

function ErrorAlert({
  message,
}: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className={[
        "mt-6 rounded-xl border",
        "border-red-200",
        "bg-red-50 px-5 py-4",
        "text-red-700",
      ].join(" ")}
    >
      {message}
    </div>
  );
}