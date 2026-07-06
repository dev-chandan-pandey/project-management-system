import { Schema, model, HydratedDocument } from "mongoose";
import { IUser, UserRole } from "./user.types";

export type UserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.TEAM_MEMBER,
    },

    avatar: String,
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", userSchema);