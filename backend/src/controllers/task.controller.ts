import { Response } from "express";
import Task from "../models/task.model";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middleware/auth.middleware";
import User from "../models/user.model";
import { logActivity } from "../utils/activity";
import { UserRole } from "../models/user.model";

export const createTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user!._id,
    });

    await logActivity({
      action: "Task Created",
      description: `${task.title} created`,
      user: req.user!._id.toString(),
      task: task._id.toString(),
      project: task.project.toString(),
    });

    await User.findByIdAndUpdate(task.assignedTo, {
      $addToSet: { assignedTasks: task._id },
    });

    return res.status(201).json(new ApiResponse(true, "Task Created", task));
  }
);

export const getTasks = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const filter: any = {};

    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.project) filter.project = req.query.project;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;

    const query = Task.find(filter)
      .populate("assignedTo", "name email role")
      .populate("project", "name")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    if (!req.query.page && !req.query.limit) {
      const tasks = await query;
      return res.json(new ApiResponse(true, "Tasks", { tasks }));
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const total = await Task.countDocuments(filter);

    const tasks = await query.skip((page - 1) * limit).limit(limit);

    return res.json(
      new ApiResponse(true, "Tasks", {
        tasks,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      })
    );
  }
);

export const getTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email role")
      .populate("project", "name");

    if (!task) throw new ApiError(404, "Task not found");

    return res.json(new ApiResponse(true, "Task", task));
  }
);

export const updateTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const oldTask = await Task.findById(req.params.id);
    if (!oldTask) throw new ApiError(404, "Task not found");

    if (
      req.user?.role === UserRole.TEAM_MEMBER &&
      oldTask.assignedTo.toString() !== req.user!._id.toString()
    ) {
      throw new ApiError(403, "You can update only your assigned tasks.");
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) throw new ApiError(404, "Task not found");

    if (oldTask.status !== task.status) {
      await logActivity({
        action: "Task Status Updated",
        description: `${task.title} moved to ${task.status}`,
        user: req.user!._id.toString(),
        task: task._id.toString(),
        project: task.project.toString(),
      });
    }

    if (oldTask.assignedTo?.toString() !== task.assignedTo?.toString()) {
      await logActivity({
        action: "Task Assigned",
        description: `${task.title} assigned`,
        user: req.user!._id.toString(),
        task: task._id.toString(),
        project: task.project.toString(),
      });
    }

    if (task.status === "Completed") {
      await logActivity({
        action: "Task Completed",
        description: `${task.title} completed`,
        user: req.user!._id.toString(),
        task: task._id.toString(),
        project: task.project.toString(),
      });
    }

    return res.json(new ApiResponse(true, "Task Updated", task));
  }
);

export const updateTaskStatus = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { status } = req.body;

    const allowedStatuses = [
      "Todo",
      "In Progress",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      throw new ApiError(400, "Invalid task status.");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new ApiError(404, "Task not found.");
    }

    // Team Member can move only their own task
    if (
      req.user?.role === UserRole.TEAM_MEMBER &&
      task.assignedTo.toString() !== req.user!._id.toString()
    ) {
      throw new ApiError(
        403,
        "You can update only your assigned tasks."
      );
    }

    // Nothing changed
    if (task.status === status) {
      return res.json(
        new ApiResponse(
          true,
          "Task already in this status.",
          task
        )
      );
    }

    const previousStatus = task.status;

    task.status = status;

    await task.save();

    await logActivity({
      action: "Task Status Updated",
      description: `${task.title} moved from ${previousStatus} to ${status}`,
      user: req.user!._id.toString(),
      task: task._id.toString(),
      project: task.project.toString(),
    });

    if (
      previousStatus !== "Completed" &&
      status === "Completed"
    ) {
      await logActivity({
        action: "Task Completed",
        description: `${task.title} completed`,
        user: req.user!._id.toString(),
        task: task._id.toString(),
        project: task.project.toString(),
      });
    }

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email role")
      .populate("project", "name")
      .populate("createdBy", "name");

    return res.json(
      new ApiResponse(
        true,
        "Task status updated successfully.",
        populatedTask
      )
    );
  }
);

export const deleteTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const task = await Task.findById(req.params.id);
    if (!task) throw new ApiError(404, "Task not found");

    await User.findByIdAndUpdate(task.assignedTo, {
      $pull: { assignedTasks: task._id },
    });

    await logActivity({
      action: "Task Deleted",
      description: `${task.title} deleted`,
      user: req.user!._id.toString(),
      task: task._id.toString(),
      project: task.project.toString(),
    });

    await Task.findByIdAndDelete(req.params.id);

    return res.json(new ApiResponse(true, "Task Deleted", null));
  }
);
