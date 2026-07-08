import type {
  Request,
  Response,
} from "express";

import {
  requestAuthUsers,
} from "../services/auth-user-client.service";

export async function getUsers(
  _request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestAuthUsers(
      "/internal/users",
    );

  response.status(200).json(result);
}

export async function addUser(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestAuthUsers(
      "/internal/users",
      {
        method: "POST",
        body: request.body,
      },
    );

  response.status(201).json(result);
}

export async function updateUser(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestAuthUsers(
      `/internal/users/${request.params.id}`,
      {
        method: "PUT",
        body: request.body,
      },
    );

  response.status(200).json(result);
}

export async function deleteUser(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestAuthUsers(
      `/internal/users/${request.params.id}`,
      {
        method: "DELETE",
      },
    );

  response.status(200).json(result);
}