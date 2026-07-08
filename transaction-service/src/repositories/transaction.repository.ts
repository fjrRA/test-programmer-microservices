import type {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import type {
  PoolConnection,
} from "mysql2/promise";

import {
  database,
} from "../config/database";

export type CartItem = {
  id: number;
  buyerId: number;
  transactionId: number | null;
  productId: number;
  harga: number;
  quantity: number;
  createdAt: Date;
};

export type Transaction = {
  id: number;
  billingCode: string;
  buyerId: number;
  totalPrice: number;
  status:
  | "BELUM_DIBAYAR"
  | "SUDAH_DIBAYAR";
  expiredAt: Date;
  paidAt: Date | null;
  createdAt: Date;
};

type CartItemRow =
  RowDataPacket & CartItem;

type TransactionRow =
  RowDataPacket & Transaction;

export async function findOpenCartItem(
  buyerId: number,
  productId: number,
): Promise<CartItem | null> {
  const [rows] =
    await database.query<
      CartItemRow[]
    >(
      `
        SELECT
          id,
          pembeli_id AS buyerId,
          transaksi_id AS transactionId,
          produk_id AS productId,
          harga,
          quantity,
          created_at AS createdAt
        FROM keranjang
        WHERE pembeli_id = ?
          AND produk_id = ?
          AND transaksi_id IS NULL
        LIMIT 1
      `,
      [
        buyerId,
        productId,
      ],
    );

  return rows[0] ?? null;
}

export async function insertCartItem(
  buyerId: number,
  productId: number,
  harga: number,
  quantity: number,
): Promise<void> {
  await database.execute(
    `
      INSERT INTO keranjang (
        pembeli_id,
        produk_id,
        harga,
        quantity
      )
      VALUES (?, ?, ?, ?)
    `,
    [
      buyerId,
      productId,
      harga,
      quantity,
    ],
  );
}

export async function updateCartItem(
  id: number,
  harga: number,
  quantity: number,
): Promise<void> {
  await database.execute(
    `
      UPDATE keranjang
      SET
        harga = ?,
        quantity = ?
      WHERE id = ?
    `,
    [
      harga,
      quantity,
      id,
    ],
  );
}

export async function findOpenCartItems(
  buyerId: number,
): Promise<CartItem[]> {
  const [rows] =
    await database.query<
      CartItemRow[]
    >(
      `
        SELECT
          id,
          pembeli_id AS buyerId,
          transaksi_id AS transactionId,
          produk_id AS productId,
          harga,
          quantity,
          created_at AS createdAt
        FROM keranjang
        WHERE pembeli_id = ?
          AND transaksi_id IS NULL
        ORDER BY created_at ASC
      `,
      [buyerId],
    );

  return rows;
}

export async function insertTransaction(
  connection: PoolConnection,
  input: {
    billingCode: string;
    buyerId: number;
    totalPrice: number;
    expiredAt: Date;
  },
): Promise<number> {
  const [result] =
    await connection.execute<
      ResultSetHeader
    >(
      `
        INSERT INTO transaksi (
          kode_billing,
          pembeli_id,
          total_harga,
          status,
          expired_at
        )
        VALUES (
          ?,
          ?,
          ?,
          'BELUM_DIBAYAR',
          ?
        )
      `,
      [
        input.billingCode,
        input.buyerId,
        input.totalPrice,
        input.expiredAt,
      ],
    );

  return result.insertId;
}

export async function attachCartToTransaction(
  connection: PoolConnection,
  buyerId: number,
  transactionId: number,
): Promise<void> {
  await connection.execute(
    `
      UPDATE keranjang
      SET transaksi_id = ?
      WHERE pembeli_id = ?
        AND transaksi_id IS NULL
    `,
    [
      transactionId,
      buyerId,
    ],
  );
}

export async function findTransactionsByBuyer(
  buyerId: number,
): Promise<Transaction[]> {
  const [rows] =
    await database.query<
      TransactionRow[]
    >(
      `
        SELECT
          id,
          kode_billing AS billingCode,
          pembeli_id AS buyerId,
          total_harga AS totalPrice,
          status,
          expired_at AS expiredAt,
          paid_at AS paidAt,
          created_at AS createdAt
        FROM transaksi
        WHERE pembeli_id = ?
        ORDER BY created_at DESC
      `,
      [buyerId],
    );

  return rows;
}

export async function findTransactionById(
  id: number,
): Promise<Transaction | null> {
  const [rows] =
    await database.query<
      TransactionRow[]
    >(
      `
        SELECT
          id,
          kode_billing AS billingCode,
          pembeli_id AS buyerId,
          total_harga AS totalPrice,
          status,
          expired_at AS expiredAt,
          paid_at AS paidAt,
          created_at AS createdAt
        FROM transaksi
        WHERE id = ?
        LIMIT 1
      `,
      [id],
    );

  return rows[0] ?? null;
}

export async function findTransactionItems(
  transactionId: number,
): Promise<CartItem[]> {
  const [rows] =
    await database.query<
      CartItemRow[]
    >(
      `
        SELECT
          id,
          pembeli_id AS buyerId,
          transaksi_id AS transactionId,
          produk_id AS productId,
          harga,
          quantity,
          created_at AS createdAt
        FROM keranjang
        WHERE transaksi_id = ?
      `,
      [transactionId],
    );

  return rows;
}

export async function markTransactionPaid(
  id: number,
): Promise<void> {
  await database.execute(
    `
      UPDATE transaksi
      SET
        status = 'SUDAH_DIBAYAR',
        paid_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [id],
  );
}

export async function findAllTransactions():
  Promise<Transaction[]> {
  const [rows] =
    await database.query<
      TransactionRow[]
    >(
      `
        SELECT
          id,
          kode_billing AS billingCode,
          pembeli_id AS buyerId,
          total_harga AS totalPrice,
          status,
          expired_at AS expiredAt,
          paid_at AS paidAt,
          created_at AS createdAt
        FROM transaksi
        ORDER BY created_at DESC
      `,
    );

  return rows;
}