import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt-payload";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not configured.");
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};