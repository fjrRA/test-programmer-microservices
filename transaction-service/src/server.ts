// api-gateway/src/server.ts
import type {
  Server,
} from "node:http";

import {
  env,
} from "./config/env";

import {
  app,
} from "./app";

let server: Server;

function startServer(): void {
  server = app.listen(
    env.PORT,
    () => {
      console.log(
        `${env.SERVICE_NAME} is running on http://localhost:${env.PORT}`,
      );
    },
  );
}

function shutdownServer(
  signal: string,
): void {
  console.log(
    `${signal} received. Closing ${env.SERVICE_NAME}...`,
  );

  server.close(() => {
    console.log(
      `${env.SERVICE_NAME} stopped successfully`,
    );

    process.exit(0);
  });
}

startServer();

process.on(
  "SIGINT",
  () => shutdownServer("SIGINT"),
);

process.on(
  "SIGTERM",
  () => shutdownServer("SIGTERM"),
);