import { Response } from "express";

import { asyncHandler } from "../../common/utils/asyncHandler";
import { AuthRequest } from "../../common/types/auth-request";

import { taskService } from "./task.service";
import {
  CreateTaskDto,
  TaskQueryDto,
  TaskStatus,
  UpdateTaskDto,
} from "./task.types";

export const createTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const task = await taskService.create(
      req.body as CreateTaskDto,
      req.user!.id
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: task,
    });
  }
);

export const getTasks = asyncHandler(
  async (req, res: Response) => {
    const result = await taskService.findAll(
      req.query as unknown as TaskQueryDto
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

export const getTaskById = asyncHandler(
  async (req, res: Response) => {
    const task = await taskService.findById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: task,
    });
  }
);

export const updateTask = asyncHandler(
  async (req, res: Response) => {
    const task = await taskService.update(
      req.params.id,
      req.body as UpdateTaskDto
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: task,
    });
  }
);

export const updateTaskStatus = asyncHandler(
  async (req, res: Response) => {
    const task =
      await taskService.updateStatus(
        req.params.id,
        req.body.status as TaskStatus
      );

    res.status(200).json({
      success: true,
      message: "Task status updated.",
      data: task,
    });
  }
);

export const deleteTask = asyncHandler(
  async (req, res: Response) => {
    await taskService.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
    });
  }
);