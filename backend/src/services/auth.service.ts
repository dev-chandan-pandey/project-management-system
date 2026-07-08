import bcrypt from "bcrypt";
import User, { UserRole } from "../models/user.model";
import ApiError from "../utils/ApiError";
import { generateToken } from "../utils/jwt";

export class AuthService {
  async register(data: { name: string; email: string; password: string; role: UserRole }) {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new ApiError(409, "Email already exists");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({ ...data, password: hashedPassword });

    const token = generateToken(user.id);

    return { token, user };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, "Invalid credentials");

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new ApiError(401, "Invalid credentials");

    const token = generateToken(user.id);

    return { token, user };
  }
}
