import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../product-api";

import type {
  Product,
  ProductInput,
} from "../../../types/product";

function getErrorMessage(
  error: unknown,
): string {
  return error instanceof Error
    ? error.message
    : "Gagal memuat produk.";
}

export function useProducts() {
  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadProducts =
    useCallback(
      async (): Promise<void> => {
        setIsLoading(true);
        setError("");

        try {
          const data =
            await getProducts();

          setProducts(data);
        } catch (caughtError) {
          setError(
            getErrorMessage(
              caughtError,
            ),
          );
        } finally {
          setIsLoading(false);
        }
      },
      [],
    );

  useEffect(
    () => {
      let isActive = true;

      getProducts()
        .then((data) => {
          if (!isActive) {
            return;
          }

          setProducts(data);
          setError("");
        })
        .catch((caughtError: unknown) => {
          if (!isActive) {
            return;
          }

          setError(
            getErrorMessage(
              caughtError,
            ),
          );
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

  async function addProduct(
    input: ProductInput,
  ): Promise<void> {
    const product =
      await createProduct(input);

    setProducts(
      (currentProducts) => [
        product,
        ...currentProducts,
      ],
    );
  }

  async function editProduct(
    productId: number,
    input: ProductInput,
  ): Promise<void> {
    const updatedProduct =
      await updateProduct(
        productId,
        input,
      );

    setProducts(
      (currentProducts) =>
        currentProducts.map(
          (product) =>
            product.id === productId
              ? updatedProduct
              : product,
        ),
    );
  }

  async function removeProduct(
    productId: number,
  ): Promise<void> {
    await deleteProduct(productId);

    setProducts(
      (currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !== productId,
        ),
    );
  }

  return {
    products,
    isLoading,
    error,
    setError,
    loadProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
}