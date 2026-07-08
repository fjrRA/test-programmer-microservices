import {
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  apiRequest,
} from "../lib/api-client";

import {
  clearSession,
  getStoredSession,
  storeSession,
} from "../lib/session";

import type {
  AuthSession,
  AuthUser,
} from "../types/auth";

import {
  AuthContext,
} from "./auth-context";

import type {
  AuthContextValue,
  LoginInput,
} from "./auth-context";

type LoginResponse = {
  success: boolean;
  message: string;

  data: {
    token_type: string;
    access_token: string;
    expires_in: number;
    user: AuthUser;
  };
};

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [
    session,
    setSession,
  ] = useState<AuthSession | null>(
    () => getStoredSession(),
  );

  async function login(
    input: LoginInput,
  ): Promise<void> {
    const response =
      await apiRequest<LoginResponse>(
        "/login",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );

    const newSession: AuthSession = {
      accessToken:
        response.data.access_token,

      user: response.data.user,
    };

    storeSession(newSession);
    setSession(newSession);
  }

  function logout(): void {
    clearSession();
    setSession(null);
  }

  const value: AuthContextValue = {
    session,
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}