import type {
  RequestHandler,
} from "express";

import type {
  Role,
} from "../types/auth";

export function allowRoles(
  ...allowedRoles: Role[]
): RequestHandler {
  return (
    request,
    response,
    next,
  ) => {
    if (!request.user) {
      response.status(401).json({
        success: false,
        message:
          "Authentication is required",
      });

      return;
    }

    if (
      !allowedRoles.includes(
        request.user.role,
      )
    ) {
      response.status(403).json({
        success: false,
        message:
          "You do not have permission",
      });

      return;
    }

    next();
  };
}