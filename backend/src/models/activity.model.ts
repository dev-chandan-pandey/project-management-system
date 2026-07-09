import mongoose, { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  action: string;
  description: string;
  user: mongoose.Types.ObjectId;
  project?: mongoose.Types.ObjectId;
  task?: mongoose.Types.ObjectId;
}

const activitySchema = new Schema<IActivity>(
  {
    action: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export default mongoose.model<IActivity>(
  "Activity",
  activitySchema
);