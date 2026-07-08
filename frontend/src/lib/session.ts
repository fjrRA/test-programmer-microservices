import type {
  AuthSession,
} from "../types/auth";

const SESSION_KEY =
  "fullstack-test-session";

export function getStoredSession():
  AuthSession | null {
  const rawSession =
    sessionStorage.getItem(
      SESSION_KEY,
    );

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(
      rawSession,
    ) as AuthSession;
  } catch {
    sessionStorage.removeItem(
      SESSION_KEY,
    );

    return null;
  }
}

export function storeSession(
  session: AuthSession,
): void {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session),
  );
}

export function clearSession(): void {
  sessionStorage.removeItem(
    SESSION_KEY,
  );
}