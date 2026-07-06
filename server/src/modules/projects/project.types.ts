import { Types } from "mongoose";

export enum ProjectStatus {
  PLANNING = "PLANNING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export interface IProject {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  createdBy: Types.ObjectId;
  members: Types.ObjectId[];
}

export interface CreateProjectDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status?: ProjectStatus;
  members?: string[];
}
export interface ProjectQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus;
}
export interface UpdateProjectDto
  extends Partial<CreateProjectDto> {}