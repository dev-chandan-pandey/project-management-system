import bcrypt from "bcrypt";

import { ApiError } from "../../common/utils/ApiError";
import { signToken } from "../../common/utils/jwt";

import { authRepository } from "./auth.repository";
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
} from "./auth.types";

export class AuthService {
  async register(data: RegisterDto): Promise<AuthResponse> {
    const existingUser = await authRepository.findByEmail(
      data.email
    );

    if (existingUser) {
      throw new ApiError(409, "Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    const createdUser =
      await authRepository.createUser({
        ...data,
        password: hashedPassword,
      });

    const token = signToken({
      id: createdUser.id,
      role: createdUser.role,
    });

    return {
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        avatar: createdUser.avatar,
      },
      token,
    };
  }

  async login(
    credentials: LoginDto
  ): Promise<AuthResponse> {
    const user = await authRepository.findByEmail(
      credentials.email
    );

    if (!user) {
      throw new ApiError(
        401,
        "Invalid email or password."
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        credentials.password,
        user.password
      );

    if (!passwordMatches) {
      throw new ApiError(
        401,
        "Invalid email or password."
      );
    }

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    };
  }

  async me(userId: string) {
    const user =
      await authRepository.findPublicById(userId);

    if (!user) {
      throw new ApiError(
        404,
        "User not found."
      );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export const authService = new AuthService();