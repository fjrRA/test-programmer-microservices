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

export type UserRole =
  | "ADMIN"
  | "PEMBELI";

export type PublicUser = {
  id: number;
  name: string;
  email: string;
  status: boolean;
  role: UserRole;
  createdAt: Date;
};

type UserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  status: number;
  role: UserRole;
  createdAt: Date;
};

function mapUser(
  row: UserRow,
): PublicUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    status: Boolean(row.status),
    role: row.role,
    createdAt: row.createdAt,
  };
}

export async function findAllUsers():
  Promise<PublicUser[]> {
  const [rows] =
    await database.query<UserRow[]>(
      `
        SELECT
          users.id,
          users.name,
          users.email,
          users.status,
          users_role.role,
          users.created_at AS createdAt
        FROM users
        INNER JOIN users_role
          ON users_role.user_id = users.id
        ORDER BY users.created_at DESC
      `,
    );

  return rows.map(mapUser);
}

export async function findPublicUserById(
  id: number,
): Promise<PublicUser | null> {
  const [rows] =
    await database.query<UserRow[]>(
      `
        SELECT
          users.id,
          users.name,
          users.email,
          users.status,
          users_role.role,
          users.created_at AS createdAt
        FROM users
        INNER JOIN users_role
          ON users_role.user_id = users.id
        WHERE users.id = ?
        LIMIT 1
      `,
      [id],
    );

  const row = rows[0];

  return row
    ? mapUser(row)
    : null;
}

export async function findPublicUserByEmail(
  email: string,
): Promise<PublicUser | null> {
  const [rows] =
    await database.query<UserRow[]>(
      `
        SELECT
          users.id,
          users.name,
          users.email,
          users.status,
          users_role.role,
          users.created_at AS createdAt
        FROM users
        INNER JOIN users_role
          ON users_role.user_id = users.id
        WHERE users.email = ?
        LIMIT 1
      `,
      [email],
    );

  const row = rows[0];

  return row
    ? mapUser(row)
    : null;
}

export async function insertUser(
  connection: PoolConnection,
  input: {
    name: string;
    email: string;
    passwordHash: string;
    status: boolean;
  },
): Promise<number> {
  const [result] =
    await connection.execute<ResultSetHeader>(
      `
        INSERT INTO users (
          name,
          email,
          password,
          status
        )
        VALUES (?, ?, ?, ?)
      `,
      [
        input.name,
        input.email,
        input.passwordHash,
        input.status,
      ],
    );

  return result.insertId;
}

export async function insertUserRole(
  connection: PoolConnection,
  userId: number,
  role: UserRole,
): Promise<void> {
  await connection.execute<ResultSetHeader>(
    `
      INSERT INTO users_role (
        user_id,
        role
      )
      VALUES (?, ?)
    `,
    [
      userId,
      role,
    ],
  );
}

export async function updateUserRecord(
  connection: PoolConnection,
  id: number,
  input: {
    name: string;
    email: string;
    passwordHash?: string;
    status: boolean;
  },
): Promise<void> {
  if (input.passwordHash) {
    await connection.execute<ResultSetHeader>(
      `
        UPDATE users
        SET
          name = ?,
          email = ?,
          password = ?,
          status = ?
        WHERE id = ?
      `,
      [
        input.name,
        input.email,
        input.passwordHash,
        input.status,
        id,
      ],
    );

    return;
  }

  await connection.execute<ResultSetHeader>(
    `
      UPDATE users
      SET
        name = ?,
        email = ?,
        status = ?
      WHERE id = ?
    `,
    [
      input.name,
      input.email,
      input.status,
      id,
    ],
  );
}

export async function updateUserRole(
  connection: PoolConnection,
  userId: number,
  role: UserRole,
): Promise<void> {
  await connection.execute<ResultSetHeader>(
    `
      UPDATE users_role
      SET role = ?
      WHERE user_id = ?
    `,
    [
      role,
      userId,
    ],
  );
}

export async function deleteUserRecord(
  connection: PoolConnection,
  id: number,
): Promise<void> {
  await connection.execute<ResultSetHeader>(
    `
      DELETE FROM users
      WHERE id = ?
    `,
    [id],
  );
}