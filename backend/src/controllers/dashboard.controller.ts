// Dashboard controller placeholder
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";

import Project from "../models/project.model";
import Task, { TaskStatus } from "../models/task.model";
import User from "../models/user.model";

export const getDashboardStats = asyncHandler(
  async (req: Request, res: Response) => {
    const [
      totalProjects,
      totalTasks,
      completedTasks,
      todoTasks,
      inProgressTasks,
      totalMembers,
      latestTasks,
      recentProjects,
    ] = await Promise.all([
      Project.countDocuments(),

      Task.countDocuments(),

      Task.countDocuments({
        status: TaskStatus.COMPLETED,
      }),

      Task.countDocuments({
        status: TaskStatus.TODO,
      }),

      Task.countDocuments({
        status: TaskStatus.IN_PROGRESS,
      }),

      User.countDocuments(),

      Task.find()
        .populate("assignedTo", "name")
        .populate("project", "name")
        .sort({ createdAt: -1 })
        .limit(5),

      Project.find()
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    const tasksByStatus = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const tasksByPriority = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const projectsByStatus = await Project.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(
      new ApiResponse(true, "Dashboard Data", {
        metrics: {
          totalProjects,
          totalTasks,
          completedTasks,
          todoTasks,
          inProgressTasks,
          totalMembers,
        },

        charts: {
      tasksByStatus,
      tasksByPriority,
      projectsByStatus,
    },

        latestTasks,

        recentProjects,
      })
    );
  }
);