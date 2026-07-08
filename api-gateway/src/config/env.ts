// api-gateway/src/config/env.ts
import "dotenv/config";

import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3000),

  SERVICE_NAME: z
    .string()
    .min(1)
    .default("api-gateway"),

  INTERNAL_KEY: z
    .string()
    .min(1),

  MASTER_SERVICE_URL: z
    .string()
    .url(),

  AUTH_SERVICE_URL: z
    .string()
    .url(),

  JWT_SECRET: z
    .string()
    .min(32),

  RBAC_SERVICE_URL: z
    .string()
    .url(),

  TRANSACTION_SERVICE_URL: z
    .string()
    .url(),
});

const parsedEnvironment =
  environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnvironment.error.flatten().fieldErrors,
  );

  process.exit(1);
}

export const env = parsedEnvironment.data;