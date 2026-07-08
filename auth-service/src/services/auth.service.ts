import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  env,
} from "../config/env";

import {
  AppError,
} from "../errors/app-error";

import {
  findUserByEmail,
  findUserById,
} from "../repositories/auth.repository";

import type {
  LoginBody,
} from "../schemas/auth.schema";

export async function authenticateUser(
  input: LoginBody,
) {
  const user =
    await findUserByEmail(input.email);

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401,
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      input.password,
      user.password,
    );

  if (!passwordMatches) {
    throw new AppError(
      "Invalid email or password",
      401,
    );
  }

  if (!user.status) {
    throw new AppError(
      "User account is inactive",
      403,
    );
  }

  const accessToken = jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn:
        env.JWT_EXPIRES_IN_SECONDS,

      issuer: "auth-service",
      audience: "api-gateway",
    },
  );

  return {
    token_type: "Bearer",
    access_token: accessToken,
    expires_in:
      env.JWT_EXPIRES_IN_SECONDS,

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function getAuthenticatedUser(
  userId: number,
) {
  const user =
    await findUserById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
    );
  }

  if (!user.status) {
    throw new AppError(
      "User account is inactive",
      403,
    );
  }

  return user;
}