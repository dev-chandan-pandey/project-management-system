import {
  Schema,
  model,
  HydratedDocument,
} from "mongoose";

import {
  ActivityAction,
  IActivity,
} from "./activity.types";

export type ActivityDocument =
  HydratedDocument<IActivity>;

const activitySchema =
  new Schema<IActivity>(
    {
      action: {
        type: String,
        enum: Object.values(ActivityAction),
        required: true,
        index: true,
      },

      message: {
        type: String,
        required: true,
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },

      task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    },
    {
      timestamps: true,
    }
  );

activitySchema.index({
  createdAt: -1,
});

export const ActivityModel =
  model<IActivity>(
    "Activity",
    activitySchema
  );