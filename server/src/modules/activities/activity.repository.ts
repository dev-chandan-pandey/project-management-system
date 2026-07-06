import { ActivityModel } from "./activity.model";
import { IActivity } from "./activity.types";

export class ActivityRepository {
  create(data: Partial<IActivity>) {
    return ActivityModel.create(data);
  }

  async findLatest(
    page = 1,
    limit = 20
  ) {
    const skip = (page - 1) * limit;

    const [activities, total] =
      await Promise.all([
        ActivityModel.find()
          .populate(
            "user",
            "name email"
          )
          .populate(
            "project",
            "name"
          )
          .populate(
            "task",
            "title"
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit),

        ActivityModel.countDocuments(),
      ]);

    return {
      activities,
      total,
      page,
      limit,
    };
  }
}

export const activityRepository =
  new ActivityRepository();