import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { AuthService } from "../services/auth.service";
import { loginSchema, registerSchema, RegisterInput } from "../validators/auth.validator";
import { logActivity } from "../utils/activity";
import { AuthRequest } from "../middleware/auth.middleware";
const service = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const body: RegisterInput = registerSchema.parse(req.body);

  // ✅ body.role is now typed as UserRole
  const result = await service.register(body);

  await logActivity({
    action: "User Registered",
    description: `${result.user.name} joined the platform`,
    user: result.user._id.toString(),
  });

  return res.status(201).json(
    new ApiResponse(true, "User registered successfully", result)
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);

  const result = await service.login(body.email, body.password);

  return res.json(new ApiResponse(true, "Login successful", result));
});


export const me = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    return res.json(
      new ApiResponse(
        true,
        "Current user",
        req.user
      )
    );

  }
);