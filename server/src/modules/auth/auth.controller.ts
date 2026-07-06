import { Response } from "express";

import { asyncHandler } from "../../common/utils/asyncHandler";
import { AuthRequest } from "../../common/types/auth-request";

import { authService } from "./auth.service";
import {
  LoginDto,
  RegisterDto,
} from "./auth.types";

export const register = asyncHandler(
  async (req, res: Response) => {
    const result = await authService.register(
      req.body as RegisterDto
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: result,
    });
  }
);

export const login = asyncHandler(
  async (req, res: Response) => {
    const result = await authService.login(
      req.body as LoginDto
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  }
);

export const me = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await authService.me(
      req.user!.id
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const logout = asyncHandler(
  async (_req, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  }
);