import { FilterQuery } from "mongoose";
import { ProjectModel } from "./project.model";
import {
  IProject,
  ProjectQueryDto,
} from "./project.types";

export class ProjectRepository {
  async findMany(query: ProjectQueryDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const skip = (page - 1) * limit;

    const filter: FilterQuery<IProject> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.search) {
      filter.name = {
        $regex: query.search,
        $options: "i",
      };
    }

    const [projects, total] = await Promise.all([
      ProjectModel.find(filter)
        .populate("createdBy", "name email role")
        .populate("members", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      ProjectModel.countDocuments(filter),
    ]);

    return {
      projects,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}