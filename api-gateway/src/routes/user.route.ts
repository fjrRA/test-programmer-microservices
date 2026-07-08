import {
  Router,
} from "express";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

import {
  authMiddleware,
} from "../middlewares/auth.middleware";

import {
  allowRoles,
} from "../middlewares/role.middleware";

export const userRouter =
  Router();

userRouter.use(
  authMiddleware,
  allowRoles("ADMIN"),
);

userRouter.get(
  "/",
  getUsers,
);

userRouter.post(
  "/",
  createUser,
);

userRouter.put(
  "/:id",
  updateUser,
);

userRouter.delete(
  "/:id",
  deleteUser,
);