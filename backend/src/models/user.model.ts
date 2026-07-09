import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  ADMIN = "Admin",
  PROJECT_MANAGER = "Project Manager",
  TEAM_MEMBER = "Team Member",
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  assignedProjects?: string[];
  assignedTasks?: string[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.TEAM_MEMBER,
    },
    assignedProjects: [{ type: Schema.Types.ObjectId, ref: "Project", default: [] }],
    assignedTasks: [{ type: Schema.Types.ObjectId, ref: "Task", default: [] }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
