import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import { AuthRequest } from "../middleware/auth.middleware";

import Project, { ProjectStatus } from "../models/project.model";
import Task, { TaskStatus } from "../models/task.model";
import User, { UserRole } from "../models/user.model";
import Activity from "../models/activity.model";

export const getDashboardStats = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const currentUser = req.user!;

    const taskFilter: any = {};
    const projectFilter: any = {};

    // ----------------------------
    // Role Based Dashboard
    // ----------------------------

    if (currentUser.role === UserRole.TEAM_MEMBER) {
      taskFilter.assignedTo = currentUser._id;
      projectFilter.members = currentUser._id;
    }

    if (currentUser.role === UserRole.PROJECT_MANAGER) {
      projectFilter.$or = [
        { createdBy: currentUser._id },
        { members: currentUser._id },
      ];
    }

    const [
      totalProjects,
      totalTasks,
      completedTasks,
      todoTasks,
      inProgressTasks,
      archivedProjects,
      totalMembers,
      latestTasks,
      recentProjects,
      recentActivities,
    ] = await Promise.all([
      Project.countDocuments(projectFilter),

      Task.countDocuments(taskFilter),

      Task.countDocuments({
        ...taskFilter,
        status: TaskStatus.COMPLETED,
      }),

      Task.countDocuments({
        ...taskFilter,
        status: TaskStatus.TODO,
      }),

      Task.countDocuments({
        ...taskFilter,
        status: TaskStatus.IN_PROGRESS,
      }),

      Project.countDocuments({
        ...projectFilter,
        status: ProjectStatus.ARCHIVED,
      }),

      User.countDocuments(),

      Task.find(taskFilter)
        .populate("assignedTo", "name")
        .populate("project", "name")
        .sort({ createdAt: -1 })
        .limit(5),

      Project.find(projectFilter)
        .sort({ createdAt: -1 })
        .limit(5),

      Activity.find()
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .limit(6),
    ]);

    const tasksByStatus = await Task.aggregate([
      { $match: taskFilter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const tasksByPriority = await Task.aggregate([
      { $match: taskFilter },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const projectsByStatus = await Project.aggregate([
      { $match: projectFilter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.json(
      new ApiResponse(true, "Dashboard Loaded", {
        metrics: {
          totalProjects,
          totalTasks,
          completedTasks,
          todoTasks,
          inProgressTasks,
          archivedProjects,
          totalMembers,
        },

        charts: {
          tasksByStatus,
          tasksByPriority,
          projectsByStatus,
        },

        latestTasks,
        recentProjects,
        recentActivities,

        currentUser: {
          name: currentUser.name,
          role: currentUser.role,
        },
      })
    );
  }
);