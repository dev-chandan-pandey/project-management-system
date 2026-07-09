import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { Request } from "express";

export interface AuthRequest extends Request{

user?:IUser;

}

export const authenticate = async (
  req: AuthRequest,
  _: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};