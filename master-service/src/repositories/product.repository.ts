import type {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import {
  database,
} from "../config/database";

export type Product = {
  id: number;
  name: string;
  harga: number;
  createdAt: Date;
};

type ProductRow =
  RowDataPacket & Product;

export async function findAllProducts():
  Promise<Product[]> {
  const [rows] =
    await database.query<ProductRow[]>(
      `
        SELECT
          id,
          name,
          harga,
          created_at AS createdAt
        FROM produk
        ORDER BY created_at DESC
      `,
    );

  return rows;
}

export async function findProductById(
  id: number,
): Promise<Product | null> {
  const [rows] =
    await database.query<ProductRow[]>(
      `
        SELECT
          id,
          name,
          harga,
          created_at AS createdAt
        FROM produk
        WHERE id = ?
        LIMIT 1
      `,
      [id],
    );

  return rows[0] ?? null;
}

export async function findProductByName(
  name: string,
): Promise<Product | null> {
  const [rows] =
    await database.query<ProductRow[]>(
      `
        SELECT
          id,
          name,
          harga,
          created_at AS createdAt
        FROM produk
        WHERE name = ?
        LIMIT 1
      `,
      [name],
    );

  return rows[0] ?? null;
}

export async function insertProduct(
  name: string,
  harga: number,
): Promise<Product | null> {
  const [result] =
    await database.execute<ResultSetHeader>(
      `
        INSERT INTO produk (
          name,
          harga
        )
        VALUES (?, ?)
      `,
      [
        name,
        harga,
      ],
    );

  return findProductById(
    result.insertId,
  );
}

export async function updateProductById(
  id: number,
  name: string,
  harga: number,
): Promise<Product | null> {
  await database.execute<ResultSetHeader>(
    `
      UPDATE produk
      SET
        name = ?,
        harga = ?
      WHERE id = ?
    `,
    [
      name,
      harga,
      id,
    ],
  );

  return findProductById(id);
}

export async function deleteProductById(
  id: number,
): Promise<boolean> {
  const [result] =
    await database.execute<ResultSetHeader>(
      `
        DELETE FROM produk
        WHERE id = ?
      `,
      [id],
    );

  return result.affectedRows > 0;
}