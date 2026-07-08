import {
  Router,
} from "express";

import {
  getMe,
  login,
} from "../controllers/auth.controller";

export const authRouter =
  Router();

authRouter.post(
  "/login",
  login,
);

authRouter.get(
  "/me",
  getMe,
);