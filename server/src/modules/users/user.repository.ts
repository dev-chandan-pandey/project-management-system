import { UserModel } from "./user.model";

export class UserRepository {
  findAll() {
    return UserModel.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });
  }

  findById(id: string) {
    return UserModel.findById(id)
      .select("-password");
  }

  updateRole(
    id: string,
    role: string
  ) {
    return UserModel.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
      }
    ).select("-password");
  }
}

export const userRepository =
  new UserRepository();