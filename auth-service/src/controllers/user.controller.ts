import type {
  Request,
  Response,
} from "express";

import {
  createUserBodySchema,
  updateUserBodySchema,
  userIdParamSchema,
} from "../schemas/user.schema";

import {
  createUser,
  getUsers,
  removeUser,
  updateUser,
} from "../services/user.service";

export async function getUserList(
  _request: Request,
  response: Response,
): Promise<void> {
  const users =
    await getUsers();

  response.status(200).json({
    success: true,
    data: users,
  });
}

export async function createNewUser(
  request: Request,
  response: Response,
): Promise<void> {
  const input =
    createUserBodySchema.parse(
      request.body,
    );

  const user =
    await createUser(input);

  response.status(201).json({
    success: true,
    message:
      "User created successfully",
    data: user,
  });
}

export async function updateExistingUser(
  request: Request,
  response: Response,
): Promise<void> {
  const {
    id,
  } = userIdParamSchema.parse(
    request.params,
  );

  const input =
    updateUserBodySchema.parse(
      request.body,
    );

  const user =
    await updateUser(
      id,
      input,
    );

  response.status(200).json({
    success: true,
    message:
      "User updated successfully",
    data: user,
  });
}

export async function deleteExistingUser(
  request: Request,
  response: Response,
): Promise<void> {
  const {
    id,
  } = userIdParamSchema.parse(
    request.params,
  );

  await removeUser(id);

  response.status(200).json({
    success: true,
    message:
      "User deleted successfully",
  });
}