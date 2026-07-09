import { z } from "zod";
import { UserRole } from "../models/user.model";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]]), // ✅ ensures role is UserRole
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

// Infer types directly
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
