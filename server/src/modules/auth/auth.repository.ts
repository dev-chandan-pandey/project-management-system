import { UserModel } from "../users/user.model";
import { RegisterDto } from "./auth.types";

export class AuthRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email }).select("+password");
  }

  async createUser(data: RegisterDto & { password: string }) {
    return UserModel.create(data);
  }

  async findPublicById(id: string) {
    return UserModel.findById(id);
  }
}

export const authRepository = new AuthRepository();