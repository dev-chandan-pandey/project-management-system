import Activity from "../models/activity.model";

interface ActivityPayload {
  action: string;
  description: string;
  user: string;
  project?: string;
  task?: string;
  userId?: string;
}

export const logActivity = async (
  payload: ActivityPayload
) => {
  try {
    await Activity.create(payload);
  } catch (error) {
    console.log("Activity Error", error);
  }
};