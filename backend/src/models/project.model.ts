import mongoose, { Schema, Document } from "mongoose";

export enum ProjectStatus {
  PLANNING = "Planning",
  ACTIVE = "Active",
  COMPLETED = "Completed",
  ARCHIVED = "Archived",
}

export interface IProject extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  createdBy: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.PLANNING,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>(
  "Project",
  projectSchema
);