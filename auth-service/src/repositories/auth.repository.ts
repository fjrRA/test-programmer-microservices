import type {
  RowDataPacket,
} from "mysql2";

import {
  database,
} from "../config/database";

export type Role =
  | "ADMIN"
  | "PEMBELI";

export type UserWithPassword = {
  id: number;
  name: string;
  email: string;
  password: string;
  status: number;
  role: Role;
  createdAt: Date;
};

export type PublicUser = Omit<
  UserWithPassword,
  "password"
>;

type UserRow =
  RowDataPacket &
  UserWithPassword;

export async function findUserByEmail(
  email: string,
): Promise<UserWithPassword | null> {
  const [rows] =
    await database.query<UserRow[]>(
      `
        SELECT
          users.id,
          users.name,
          users.email,
          users.password,
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

  return rows[0] ?? null;
}

export async function findUserById(
  id: number,
): Promise<PublicUser | null> {
  const [rows] =
    await database.query<UserRow[]>(
      `
        SELECT
          users.id,
          users.name,
          users.email,
          users.password,
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

  const user = rows[0];

  if (!user) {
    return null;
  }

  const {
    password: _password,
    ...publicUser
  } = user;

  return publicUser;
}