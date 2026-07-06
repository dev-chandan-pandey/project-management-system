import {
  ActivityAction,
  IActivity,
} from "./activity.types";

import { activityRepository } from "./activity.repository";

export class ActivityService {
  async log(
    activity: Partial<IActivity>
  ) {
    return activityRepository.create(
      activity
    );
  }

  async timeline(
    page?: number,
    limit?: number
  ) {
    return activityRepository.findLatest(
      page,
      limit
    );
  }

  projectCreated(
    userId: string,
    projectId: string,
    projectName: string
  ) {
    return this.log({
      action:
        ActivityAction.PROJECT_CREATED,

      user: userId as any,

      project: projectId as any,

      message: `Created project "${projectName}"`,
    });
  }

  taskAssigned(
    userId: string,
    taskId: string,
    title: string
  ) {
    return this.log({
      action:
        ActivityAction.TASK_ASSIGNED,

      user: userId as any,

      task: taskId as any,

      message: `Assigned task "${title}"`,
    });
  }

  taskCompleted(
    userId: string,
    taskId: string,
    title: string
  ) {
    return this.log({
      action:
        ActivityAction.TASK_COMPLETED,

      user: userId as any,

      task: taskId as any,

      message: `Completed "${title}"`,
    });
  }
}

export const activityService =
  new ActivityService();