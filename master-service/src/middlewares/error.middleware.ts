import type {
  ErrorRequestHandler,
} from "express";

import {
  ZodError,
} from "zod";

import {
  AppError,
} from "../errors/app-error";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(422).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });

    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    success: false,
    message: "Internal server error",
  });
};