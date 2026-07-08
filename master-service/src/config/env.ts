import "dotenv/config";

import {
  z,
} from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum([
      "development",
      "test",
      "production",
    ])
    .default("development"),

  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3003),

  SERVICE_NAME: z
    .string()
    .min(1)
    .default("master-service"),

  INTERNAL_KEY: z
    .string()
    .min(1),

  DB_HOST: z
    .string()
    .min(1),

  DB_PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3306),

  DB_USER: z
    .string()
    .min(1),

  DB_PASSWORD: z
    .string()
    .default(""),

  DB_NAME: z
    .string()
    .min(1),
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

export const env =
  parsedEnvironment.data;