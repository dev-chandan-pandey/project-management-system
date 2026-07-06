import {
  Schema,
  model,
  HydratedDocument,
  Types,
} from "mongoose";

import {
  IProject,
  ProjectStatus,
} from "./project.types";

export type ProjectDocument =
  HydratedDocument<IProject>;

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
      index: true,
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
      index: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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

projectSchema.index({
  status: 1,
  createdAt: -1,
});

export const ProjectModel =
  model<IProject>("Project", projectSchema);