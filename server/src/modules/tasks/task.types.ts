import { Types } from "mongoose";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface ITask {
  title: string;
  description: string;
  project: Types.ObjectId;
  assignedTo: Types.ObjectId;
  createdBy: Types.ObjectId;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  attachments: string[];
}

export interface CreateTaskDto {
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  priority?: TaskPriority;
  dueDate: Date;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  status?: TaskStatus;
}

export interface TaskQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  project?: string;
  assignedTo?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}