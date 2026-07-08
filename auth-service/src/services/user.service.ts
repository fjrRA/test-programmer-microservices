import bcrypt from "bcryptjs";

import {
  database,
} from "../config/database";

import {
  AppError,
} from "../errors/app-error";

import {
  deleteUserRecord,
  findAllUsers,
  findPublicUserByEmail,
  findPublicUserById,
  insertUser,
  insertUserRole,
  updateUserRecord,
  updateUserRole,
} from "../repositories/user.repository";

import type {
  CreateUserBody,
  UpdateUserBody,
} from "../schemas/user.schema";

export async function getUsers() {
  return findAllUsers();
}

export async function createUser(
  input: CreateUserBody,
) {
  const existingUser =
    await findPublicUserByEmail(
      input.email,
    );

  if (existingUser) {
    throw new AppError(
      "Email already exists",
      409,
    );
  }

  const passwordHash =
    await bcrypt.hash(
      input.password,
      12,
    );

  const connection =
    await database.getConnection();

  try {
    await connection.beginTransaction();

    const userId =
      await insertUser(
        connection,
        {
          name: input.name,
          email: input.email,
          passwordHash,
          status: input.status,
        },
      );

    await insertUserRole(
      connection,
      userId,
      input.role,
    );

    await connection.commit();

    return findPublicUserById(
      userId,
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateUser(
  id: number,
  input: UpdateUserBody,
) {
  const currentUser =
    await findPublicUserById(id);

  if (!currentUser) {
    throw new AppError(
      "User not found",
      404,
    );
  }

  const userWithSameEmail =
    await findPublicUserByEmail(
      input.email,
    );

  if (
    userWithSameEmail &&
    userWithSameEmail.id !== id
  ) {
    throw new AppError(
      "Email already exists",
      409,
    );
  }

  const passwordHash =
    input.password
      ? await bcrypt.hash(
        input.password,
        12,
      )
      : undefined;

  const connection =
    await database.getConnection();

  try {
    await connection.beginTransaction();

    await updateUserRecord(
      connection,
      id,
      {
        name: input.name,
        email: input.email,
        passwordHash,
        status: input.status,
      },
    );

    await updateUserRole(
      connection,
      id,
      input.role,
    );

    await connection.commit();

    return findPublicUserById(id);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function removeUser(
  id: number,
): Promise<void> {
  const user =
    await findPublicUserById(id);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
    );
  }

  const connection =
    await database.getConnection();

  try {
    await connection.beginTransaction();

    await deleteUserRecord(
      connection,
      id,
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}