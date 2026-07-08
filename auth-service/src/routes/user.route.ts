import {
  Router,
} from "express";

import {
  createNewUser,
  deleteExistingUser,
  getUserList,
  updateExistingUser,
} from "../controllers/user.controller";

export const userRouter =
  Router();

userRouter.get(
  "/",
  getUserList,
);

userRouter.post(
  "/",
  createNewUser,
);

userRouter.put(
  "/:id",
  updateExistingUser,
);

userRouter.delete(
  "/:id",
  deleteExistingUser,
);