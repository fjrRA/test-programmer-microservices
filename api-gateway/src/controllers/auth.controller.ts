import type {
  Request,
  Response,
} from "express";

import {
  AppError,
} from "../errors/app-error";

import {
  requestAuthService,
} from "../services/auth-client.service";

export async function loginUser(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestAuthService(
      "/login",
      {
        method: "POST",
        body: request.body,
      },
    );

  response.status(200).json(result);
}

export async function getCurrentUser(
  request: Request,
  response: Response,
): Promise<void> {
  if (!request.user) {
    throw new AppError(
      "Authentication is required",
      401,
    );
  }

  const result =
    await requestAuthService(
      "/me",
      {
        headers: {
          "X-USER-ID": String(
            request.user.user_id,
          ),
        },
      },
    );

  response.status(200).json(result);
}