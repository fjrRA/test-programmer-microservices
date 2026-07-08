import type {
  Request,
  Response,
} from "express";

import {
  requestRbacService,
} from "../services/rbac-client.service";

export async function getUsers(
  _request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestRbacService(
      "/users",
    );

  response.status(200).json(result);
}

export async function createUser(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestRbacService(
      "/add_users",
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
    await requestRbacService(
      `/update_users/${request.params.id}`,
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
    await requestRbacService(
      `/delete_users/${request.params.id}`,
      {
        method: "DELETE",
      },
    );

  response.status(200).json(result);
}