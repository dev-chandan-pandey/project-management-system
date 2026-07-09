"use client";

import ActivityCard from "./ActivityCard";

interface Activity {
  _id: string;
  action: string;
  description: string;
  createdAt: string;
  user?: {
    _id?: string;
    name: string;
  };
  project?: {
    _id?: string;
    name: string;
  };
  task?: {
    _id?: string;
    title: string;
  };
}

interface Props {
  activities: Activity[];
}

export default function ActivityTimeline({
  activities,
}: Props) {
  if (activities.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-16 text-center shadow-sm">

        <h2 className="text-xl font-semibold text-gray-700">
          No Activities Found
        </h2>

        <p className="mt-2 text-gray-500">
          Activity logs will appear here when users interact
          with projects, tasks, and team members.
        </p>

      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-gray-50 p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Recent Activities
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {activities.length} Records
        </span>

      </div>

      <div>

        {activities.map((activity) => (
          <ActivityCard
            key={activity._id}
            activity={activity}
          />
        ))}

      </div>

    </div>
  );
}