import cors from "cors";
import express from "express";

import {
  errorMiddleware,
} from "./middlewares/error.middleware";

import {
  internalKeyMiddleware,
} from "./middlewares/internal-key.middleware";

import {
  notFoundMiddleware,
} from "./middlewares/not-found.middleware";

import {
  healthRouter,
} from "./routes/health.route";

import {
  transactionRouter,
} from "./routes/transaction.route";

export const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  "/health",
  healthRouter,
);

app.use(
  internalKeyMiddleware,
);

app.use(
  transactionRouter,
);

app.use(
  notFoundMiddleware,
);

app.use(
  errorMiddleware,
);