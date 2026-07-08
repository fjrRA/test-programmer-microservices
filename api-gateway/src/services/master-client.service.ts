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

export async function requestMasterService(
  path: string,
  options: RequestOptions = {},
): Promise<unknown> {
  const response = await fetch(
    `${env.MASTER_SERVICE_URL}${path}`,
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

  const result =
    await response.json() as {
      message?: string;
      [key: string]: unknown;
    };

  if (!response.ok) {
    throw new AppError(
      result.message ??
      "Master service request failed",
      response.status,
    );
  }

  return result;
}