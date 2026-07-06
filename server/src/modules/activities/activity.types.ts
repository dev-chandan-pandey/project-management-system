import { Types } from "mongoose";

export enum ActivityAction {
  PROJECT_CREATED = "PROJECT_CREATED",
  PROJECT_UPDATED = "PROJECT_UPDATED",
  PROJECT_DELETED = "PROJECT_DELETED",

  TASK_CREATED = "TASK_CREATED",
  TASK_UPDATED = "TASK_UPDATED",
  TASK_DELETED = "TASK_DELETED",

  TASK_ASSIGNED = "TASK_ASSIGNED",

  TASK_STATUS_CHANGED = "TASK_STATUS_CHANGED",

  TASK_COMPLETED = "TASK_COMPLETED",
}

export interface IActivity {
  action: ActivityAction;

  message: string;

  user: Types.ObjectId;

  project?: Types.ObjectId;

  task?: Types.ObjectId;
}