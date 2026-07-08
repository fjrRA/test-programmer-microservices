import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import {
  z,
} from "zod";

import {
  env,
} from "../config/env";

const jwtPayloadSchema = z.object({
  user_id: z
    .number()
    .int()
    .positive(),

  email: z
    .string()
    .email(),

  role: z.enum([
    "ADMIN",
    "PEMBELI",
  ]),
});

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authorizationHeader =
    request.header("authorization");

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith(
      "Bearer ",
    )
  ) {
    response.status(401).json({
      success: false,
      message:
        "Authentication token is required",
    });

    return;
  }

  const token =
    authorizationHeader
      .slice(7)
      .trim();

  if (!token) {
    response.status(401).json({
      success: false,
      message:
        "Authentication token is required",
    });

    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      env.JWT_SECRET,
      {
        issuer: "auth-service",
        audience: "api-gateway",
      },
    );

    const user =
      jwtPayloadSchema.parse(decoded);

    request.user = user;

    next();
  } catch {
    response.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
}