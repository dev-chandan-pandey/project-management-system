import { ApiError } from "../../common/utils/ApiError";
 import { getIO } from "../../socket";

const io = getIO();
import { projectRepository } from "../projects/project.repository";
import { authRepository } from "../auth/auth.repository";

import { taskRepository } from "./task.repository";
import {
  CreateTaskDto,
  TaskQueryDto,
  TaskStatus,
  UpdateTaskDto,
} from "./task.types";
import { activityService } from "../activities/activity.service";

export class TaskService {
  async create(
    dto: CreateTaskDto,
    userId: string
  ) {
    const project = await projectRepository.findById(
      dto.project
    );

    if (!project) {
      throw new ApiError(
        404,
        "Project not found."
      );
    }

    const assignedUser =
      await authRepository.findPublicById(
        dto.assignedTo
      );

    if (!assignedUser) {
      throw new ApiError(
        404,
        "Assigned user not found."
      );
    }

    const task =
      await taskRepository.create({
        ...dto,
        createdBy: userId,
      });

    /*
      Activity Hook

      await activityService.log(...)
    */
await activityService.projectCreated(
  userId,
  project.id,
  project.name
);

await activityService.taskCompleted(
  userId,
  task.id,
  task.title
);
    /*
      Email Hook

      await emailService.sendTaskAssigned(...)
    */

    /*
      Socket Hook

      io.emit(...)
    */
    getIO()
  .to(task.project.toString())
  .emit("task:created", task);
    return task;
  }

  async findAll(query: TaskQueryDto) {
    return taskRepository.findMany(query);
  }

  async findById(id: string) {
    const task =
      await taskRepository.findById(id);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found."
      );
    }

    return task;
  }

  async update(
    id: string,
    dto: UpdateTaskDto
  ) {
    const task =
      await taskRepository.update(id, dto);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found."
      );
    }

    /*
      Activity Hook
    */

    /*
      Socket Hook
    */
  

io.to(task.project.toString()).emit(
  "task:status-updated",
  {
    taskId: task.id,
    status: task.status,
  }
);
    return task;
  }

  async updateStatus(
    id: string,
    status: TaskStatus
  ) {
    const task =
      await taskRepository.update(id, {
        status,
      });

    if (!task) {
      throw new ApiError(
        404,
        "Task not found."
      );
    }

    /*
      Socket Hook
    */

    return task;
  }



  async delete(id: string) {
    const task =
      await taskRepository.delete(id);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found."
      );
    }
    getIO()
  .to(task.project.toString())
  .emit("task:deleted", {
    taskId,
  });

  }
}

export const taskService =
  new TaskService();