import { ProjectModel } from "../projects/project.model";
import { TaskModel } from "../tasks/task.model";
import { UserModel } from "../users/user.model";
import { ActivityModel } from "../activities/activity.model";

export class DashboardRepository {
  async getMetrics() {
    const [
      totalProjects,
      totalTasks,
      taskStatus,
      totalMembers,
      recentActivities,
    ] = await Promise.all([
      ProjectModel.countDocuments(),

      TaskModel.countDocuments(),

      TaskModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]),

      UserModel.countDocuments(),

      ActivityModel.find()
        .sort({
          createdAt: -1,
        })
        .limit(10),
    ]);

    return {
      totalProjects,
      totalTasks,
      taskStatus,
      totalMembers,
      recentActivities,
    };
  }
}

export const dashboardRepository =
  new DashboardRepository();