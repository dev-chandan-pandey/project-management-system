import { NextFunction, Response } from "express";
import ApiError from "../utils/ApiError";
import { AuthRequest } from "./auth.middleware";

export const authorize = (...roles: string[]) => {
  return (
    req: AuthRequest,
    _: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "You don't have permission."
      );
    }

    next();
  };
};