import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getErrorMessage,
} from "../../../lib/get-error-message";

import type {
  CreateUserInput,
  UpdateUserInput,
  User,
} from "../../../types/user";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../user-api";

export function useUsers() {
  const [
    users,
    setUsers,
  ] = useState<User[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadUsers =
    useCallback(
      async (): Promise<void> => {
        setIsLoading(true);
        setError("");

        try {
          const data =
            await getUsers();

          setUsers(data);
        } catch (caughtError) {
          setError(
            getErrorMessage(
              caughtError,
              "Gagal memuat data user.",
            ),
          );
        } finally {
          setIsLoading(false);
        }
      },
      [],
    );

  useEffect(() => {
    let isCancelled = false;

    void getUsers()
      .then((data) => {
        if (!isCancelled) {
          setUsers(data);
        }
      })
      .catch((caughtError: unknown) => {
        if (!isCancelled) {
          setError(
            getErrorMessage(
              caughtError,
              "Gagal memuat data user.",
            ),
          );
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  async function addUser(
    input: CreateUserInput,
  ): Promise<void> {
    const newUser =
      await createUser(input);

    setUsers(
      (currentUsers) => [
        newUser,
        ...currentUsers,
      ],
    );
  }

  async function editUser(
    userId: number,
    input: UpdateUserInput,
  ): Promise<void> {
    const updatedUser =
      await updateUser(
        userId,
        input,
      );

    setUsers(
      (currentUsers) =>
        currentUsers.map(
          (user) =>
            user.id === userId
              ? updatedUser
              : user,
        ),
    );
  }

  async function removeUser(
    userId: number,
  ): Promise<void> {
    await deleteUser(userId);

    setUsers(
      (currentUsers) =>
        currentUsers.filter(
          (user) =>
            user.id !== userId,
        ),
    );
  }

  return {
    users,
    isLoading,
    error,
    setError,
    loadUsers,
    addUser,
    editUser,
    removeUser,
  };
}