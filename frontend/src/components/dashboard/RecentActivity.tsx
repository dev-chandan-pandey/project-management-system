"use client";

import Link from "next/link";
import {
  CheckCircle2,
  FolderKanban,
  ClipboardList,
  Pencil,
  Trash2,
  Users,
  UserPlus,
  Clock3,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface Activity {
  _id: string;
  action: string;
  description: string;
  createdAt: string;
  user?: {
    name: string;
  };
}

interface Props {
  activities: Activity[];
}

const activityStyles: Record<
  string,
  {
    icon: JSX.Element;
    color: string;
  }
> = {
  "Project Created": {
    icon: <FolderKanban size={18} />,
    color: "bg-green-100 text-green-700",
  },

  "Project Updated": {
    icon: <Pencil size={18} />,
    color: "bg-blue-100 text-blue-700",
  },

  "Project Deleted": {
    icon: <Trash2 size={18} />,
    color: "bg-red-100 text-red-700",
  },

  "Project Members Updated": {
    icon: <Users size={18} />,
    color: "bg-indigo-100 text-indigo-700",
  },

  "Task Created": {
    icon: <ClipboardList size={18} />,
    color: "bg-green-100 text-green-700",
  },

  "Task Updated": {
    icon: <Pencil size={18} />,
    color: "bg-blue-100 text-blue-700",
  },

  "Task Assigned": {
    icon: <UserPlus size={18} />,
    color: "bg-purple-100 text-purple-700",
  },

  "Task Completed": {
    icon: <CheckCircle2 size={18} />,
    color: "bg-emerald-100 text-emerald-700",
  },

  "Task Deleted": {
    icon: <Trash2 size={18} />,
    color: "bg-red-100 text-red-700",
  },

  "Task Status Updated": {
    icon: <Clock3 size={18} />,
    color: "bg-yellow-100 text-yellow-700",
  },

  "User Registered": {
    icon: <UserPlus size={18} />,
    color: "bg-indigo-100 text-indigo-700",
  },

  "User Updated": {
    icon: <Pencil size={18} />,
    color: "bg-blue-100 text-blue-700",
  },

  "User Deleted": {
    icon: <Trash2 size={18} />,
    color: "bg-red-100 text-red-700",
  },
};

export default function RecentActivity({
  activities,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow">

      <div className="flex items-center justify-between border-b p-5">

        <div>

          <h2 className="text-lg font-bold">
            Recent Activity
          </h2>

          <p className="text-sm text-gray-500">
            Latest system events
          </p>

        </div>

        <Link
          href="/activity"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="divide-y">

        {activities.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No recent activities
          </div>

        ) : (

          activities.map((activity) => {
            const style =
              activityStyles[activity.action] ?? {
                icon: <Clock3 size={18} />,
                color:
                  "bg-gray-100 text-gray-700",
              };

            return (
              <div
                key={activity._id}
                className="flex gap-4 p-5 transition hover:bg-gray-50"
              >

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${style.color}`}
                >
                  {style.icon}
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold">
                      {activity.action}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {new Date(
                        activity.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-gray-600">
                    {activity.description}
                  </p>

                  {activity.user && (
                    <p className="mt-2 text-xs text-gray-400">
                      By {activity.user.name}
                    </p>
                  )}

                </div>

              </div>
            );
          })

        )}

      </div>

    </div>
  );
}