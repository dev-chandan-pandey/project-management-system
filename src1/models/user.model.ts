import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    PROJECT_MANAGER = "PROJECT_MANAGER",
    TEAM_MEMBER = "TEAM_MEMBER",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.TEAM_MEMBER,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>("User", userSchema);