// api-gateway/src/controllers/health.controller.ts
import type {
  Request,
  Response,
} from "express";

import { env } from "../config/env";

export function getHealthStatus(
  _request: Request,
  response: Response,
): void {
  response.status(200).json({
    success: true,
    data: {
      service: env.SERVICE_NAME,
      status: "UP",
      timestamp: new Date().toISOString(),
    },
  });
}