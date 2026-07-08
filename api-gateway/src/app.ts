import cors from "cors";
import express from "express";

import {
  errorMiddleware,
} from "./middlewares/error.middleware";

import {
  notFoundMiddleware,
} from "./middlewares/not-found.middleware";

import {
  healthRouter,
} from "./routes/health.route";

import {
  productRouter,
} from "./routes/product.route";

import {
  internalRouter,
} from "./routes/internal.route";

import {
  authRouter,
} from "./routes/auth.route";

import {
  userRouter,
} from "./routes/user.route";

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
  "/api",
  authRouter,
);

app.use(
  "/api/products",
  productRouter,
);


// app.use(
//   internalKeyMiddleware,
// );

app.use(
  "/api/users",
  userRouter,
);

app.use(
  "/internal",
  internalRouter,
);

app.use(
  "/api",
  transactionRouter,
);

app.use(
  notFoundMiddleware,
);

app.use(
  errorMiddleware,
);
