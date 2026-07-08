import {
  Router,
} from "express";

import {
  getCurrentUser,
  loginUser,
} from "../controllers/auth.controller";

import {
  authMiddleware,
} from "../middlewares/auth.middleware";

export const authRouter =
  Router();

authRouter.post(
  "/login",
  loginUser,
);

authRouter.get(
  "/me",
  authMiddleware,
  getCurrentUser,
);