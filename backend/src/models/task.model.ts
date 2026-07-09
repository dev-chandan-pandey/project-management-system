import mongoose, { Document, Schema } from "mongoose";

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum TaskStatus {
  TODO = "Todo",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface ITask extends Document {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  assignedTo: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", taskSchema);