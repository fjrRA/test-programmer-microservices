import {
  getStoredSession,
} from "./session";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:3000/api";

type ApiErrorResponse = {
  message?: string;
  [key: string]: unknown;
};

export class ApiError extends Error {
  statusCode: number;
  data: unknown;

  constructor(
    message: string,
    statusCode: number,
    data: unknown = null,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const session =
    getStoredSession();

  const headers =
    new Headers(
      options.headers,
    );

  if (
    options.body !== undefined &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  if (
    session?.accessToken &&
    !headers.has("Authorization")
  ) {
    headers.set(
      "Authorization",
      `Bearer ${session.accessToken}`,
    );
  }

  let response: Response;

  try {
    response = await fetch(
      `${API_BASE_URL}${path}`,
      {
        ...options,
        headers,
      },
    );
  } catch {
    throw new ApiError(
      "Tidak dapat terhubung ke server.",
      503,
    );
  }

  const contentType =
    response.headers.get(
      "content-type",
    );

  let result: unknown = null;

  if (response.status !== 204) {
    result =
      contentType?.includes(
        "application/json",
      )
        ? await response.json()
        : await response.text();
  }

  if (!response.ok) {
    const errorResponse =
      result as ApiErrorResponse;

    throw new ApiError(
      errorResponse?.message ??
      "Request gagal.",
      response.status,
      result,
    );
  }

  return result as T;
}