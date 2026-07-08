// api-gateway/src/routes/health.route.ts
import {
  Router,
} from "express";

import {
  getHealthStatus,
} from "../controllers/health.controller";

export const healthRouter = Router();

healthRouter.get(
  "/",
  getHealthStatus,
);