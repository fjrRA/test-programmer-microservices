// src/middlewares/internal-key.middleware.ts
import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  env,
} from "../config/env";

export function internalKeyMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const internalKey =
    request.header("x-internal-key");

  if (
    !internalKey ||
    internalKey !== env.INTERNAL_KEY
  ) {
    response.status(401).json({
      success: false,
      message: "Unauthorized internal request",
    });

    return;
  }

  next();
}