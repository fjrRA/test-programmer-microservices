import {
  createContext,
} from "react";

import type {
  AuthSession,
} from "../types/auth";

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthContextValue = {
  session: AuthSession | null;

  login: (
    input: LoginInput,
  ) => Promise<void>;

  logout: () => void;
};

export const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);