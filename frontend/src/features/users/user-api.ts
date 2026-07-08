import {
  apiRequest,
} from "../../lib/api-client";

import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../../types/user";

type UserListResponse = {
  success: boolean;
  data: User[];
};

type UserResponse = {
  success: boolean;
  message: string;
  data: User;
};

type DeleteUserResponse = {
  success: boolean;
  message: string;
};

export async function getUsers():
  Promise<User[]> {
  const response =
    await apiRequest<UserListResponse>(
      "/users",
    );

  return response.data;
}

export async function createUser(
  input: CreateUserInput,
): Promise<User> {
  const response =
    await apiRequest<UserResponse>(
      "/users",
      {
        method: "POST",
        body: JSON.stringify(input),
      },
    );

  return response.data;
}

export async function updateUser(
  userId: number,
  input: UpdateUserInput,
): Promise<User> {
  const response =
    await apiRequest<UserResponse>(
      `/users/${userId}`,
      {
        method: "PUT",
        body: JSON.stringify(input),
      },
    );

  return response.data;
}

export async function deleteUser(
  userId: number,
): Promise<void> {
  await apiRequest<DeleteUserResponse>(
    `/users/${userId}`,
    {
      method: "DELETE",
    },
  );
}