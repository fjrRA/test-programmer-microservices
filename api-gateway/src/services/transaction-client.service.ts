import {
  env,
} from "../config/env";

import {
  AppError,
} from "../errors/app-error";

type RequestOptions = {
  method?: string;
  body?: unknown;
};

export async function requestTransactionService(
  path: string,
  options: RequestOptions = {},
): Promise<unknown> {
  let response: globalThis.Response;

  try {
    response = await fetch(
      `${env.TRANSACTION_SERVICE_URL}${path}`,
      {
        method:
          options.method ?? "GET",

        headers: {
          "Content-Type":
            "application/json",

          "X-INTERNAL-KEY":
            env.INTERNAL_KEY,
        },

        body:
          options.body === undefined
            ? undefined
            : JSON.stringify(
              options.body,
            ),
      },
    );
  } catch {
    throw new AppError(
      "Transaction service is unavailable",
      502,
    );
  }

  const result =
    await response.json() as {
      message?: string;
      [key: string]: unknown;
    };

  if (!response.ok) {
    throw new AppError(
      result.message ??
      "Transaction service request failed",
      response.status,
    );
  }

  return result;
}