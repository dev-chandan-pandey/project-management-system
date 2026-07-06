import { dashboardRepository } from "./dashboard.repository";

import { TaskStatus } from "../tasks/task.types";

export class DashboardService {
  async getDashboard() {
    const metrics =
      await dashboardRepository.getMetrics();

    const completed =
      metrics.taskStatus.find(
        s => s._id === TaskStatus.COMPLETED
      )?.count ?? 0;

    const todo =
      metrics.taskStatus.find(
        s => s._id === TaskStatus.TODO
      )?.count ?? 0;

    const progress =
      metrics.taskStatus.find(
        s => s._id === TaskStatus.IN_PROGRESS
      )?.count ?? 0;

    return {
      totalProjects: metrics.totalProjects,

      totalTasks: metrics.totalTasks,

      completedTasks: completed,

      todoTasks: todo,

      inProgressTasks: progress,

      totalMembers: metrics.totalMembers,

      recentActivities:
        metrics.recentActivities,
    };
  }
}

export const dashboardService =
  new DashboardService();