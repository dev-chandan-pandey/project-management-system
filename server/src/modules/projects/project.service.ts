import { ApiError } from "../../common/utils/ApiError";
import { projectRepository } from "./project.repository";
import {
  CreateProjectDto,
  ProjectQueryDto,
  UpdateProjectDto,
} from "./project.types";

export class ProjectService {
  async create(
    dto: CreateProjectDto,
    userId: string
  ) {
    return projectRepository.create({
      ...dto,
      createdBy: userId,
    });
  }

  async findAll(query: ProjectQueryDto) {
    return projectRepository.findMany(query);
  }

  async findById(id: string) {
    const project =
      await projectRepository.findById(id);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found."
      );
    }

    return project;
  }

  async update(
    id: string,
    dto: UpdateProjectDto
  ) {
    const project =
      await projectRepository.update(id, dto);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found."
      );
    }

    return project;
  }

  async delete(id: string) {
    const project =
      await projectRepository.delete(id);

    if (!project) {
      throw new ApiError(
        404,
        "Project not found."
      );
    }

    return;
  }
}

export const projectService =
  new ProjectService();