import type {
  Request,
  Response,
} from "express";

import {
  z,
} from "zod";

import {
  AppError,
} from "../errors/app-error";

import {
  loginBodySchema,
} from "../schemas/auth.schema";

import {
  authenticateUser,
  getAuthenticatedUser,
} from "../services/auth.service";

const userIdSchema = z.coerce
  .number()
  .int()
  .positive();

export async function login(
  request: Request,
  response: Response,
): Promise<void> {
  const input =
    loginBodySchema.parse(
      request.body,
    );

  const result =
    await authenticateUser(input);

  response.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
}

export async function getMe(
  request: Request,
  response: Response,
): Promise<void> {
  const userIdHeader =
    request.header("x-user-id");

  if (!userIdHeader) {
    throw new AppError(
      "Missing gateway user context",
      400,
    );
  }

  const userId =
    userIdSchema.parse(userIdHeader);

  const user =
    await getAuthenticatedUser(userId);

  response.status(200).json({
    success: true,
    data: user,
  });
}