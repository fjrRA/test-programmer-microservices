import {
  Router,
} from "express";

import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

export const userRouter =
  Router();

userRouter.get(
  "/users",
  getUsers,
);

userRouter.post(
  "/add_users",
  addUser,
);

userRouter.put(
  "/update_users/:id",
  updateUser,
);

userRouter.delete(
  "/delete_users/:id",
  deleteUser,
);