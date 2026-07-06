import { FilterQuery } from "mongoose";

import { TaskModel } from "./task.model";
import {
  ITask,
  TaskQueryDto,
  UpdateTaskDto,
} from "./task.types";

export class TaskRepository {
  async create(data: Partial<ITask>) {
    return TaskModel.create(data);
  }

  async findMany(query: TaskQueryDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const skip = (page - 1) * limit;

    const filter: FilterQuery<ITask> = {};

    if (query.project) {
      filter.project = query.project;
    }

    if (query.assignedTo) {
      filter.assignedTo = query.assignedTo;
    }

    if (query.priority) {
      filter.priority = query.priority;
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.search) {
      filter.title = {
        $regex: query.search,
        $options: "i",
      };
    }

    const [tasks, total] = await Promise.all([
      TaskModel.find(filter)
        .populate("assignedTo", "name email")
        .populate("project", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      TaskModel.countDocuments(filter),
    ]);

    return {
      tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findById(id: string) {
    return TaskModel.findById(id)
      .populate("assignedTo", "name email")
      .populate("project", "name");
  }

  update(id: string, data: UpdateTaskDto) {
    return TaskModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  delete(id: string) {
    return TaskModel.findByIdAndDelete(id);
  }
}

export const taskRepository =
  new TaskRepository();