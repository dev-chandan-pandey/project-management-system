import {
  Schema,
  model,
  HydratedDocument,
} from "mongoose";

import {
  ITask,
  TaskPriority,
  TaskStatus,
} from "./task.types";

export type TaskDocument =
  HydratedDocument<ITask>;

const taskSchema = new Schema<ITask>(
  {
    title: {
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

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
      index: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    attachments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.index({
  project: 1,
  status: 1,
});

taskSchema.index({
  assignedTo: 1,
  status: 1,
});

export const TaskModel =
  model<ITask>("Task", taskSchema);