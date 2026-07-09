"use client";

import {
  CheckCircle2,
  FolderKanban,
  ClipboardList,
  Trash2,
  Pencil,
  UserPlus,
  Users,
  Clock3,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface ActivityUser {
  _id?: string;
  name: string;
}

interface ActivityProject {
  _id?: string;
  name: string;
}

interface ActivityTask {
  _id?: string;
  title: string;
}

interface Activity {
  _id: string;
  action: string;
  description: string;
  createdAt: string;
  user?: ActivityUser;
  project?: ActivityProject;
  task?: ActivityTask;
}

interface Props {
  activity: Activity;
}

const actionStyle: Record<
  string,
  {
    color: string;
    icon: JSX.Element;
  }
> = {
  "Project Created": {
    color: "bg-green-100 text-green-700",
    icon: <FolderKanban size={18} />,
  },

  "Project Updated": {
    color: "bg-blue-100 text-blue-700",
    icon: <Pencil size={18} />,
  },

  "Project Deleted": {
    color: "bg-red-100 text-red-700",
    icon: <Trash2 size={18} />,
  },

  "Project Members Updated": {
    color: "bg-indigo-100 text-indigo-700",
    icon: <Users size={18} />,
  },

  "Task Created": {
    color: "bg-green-100 text-green-700",
    icon: <ClipboardList size={18} />,
  },

  "Task Updated": {
    color: "bg-blue-100 text-blue-700",
    icon: <Pencil size={18} />,
  },

  "Task Assigned": {
    color: "bg-purple-100 text-purple-700",
    icon: <UserPlus size={18} />,
  },

  "Task Completed": {
    color: "bg-emerald-100 text-emerald-700",
    icon: <CheckCircle2 size={18} />,
  },

  "Task Deleted": {
    color: "bg-red-100 text-red-700",
    icon: <Trash2 size={18} />,
  },

  "Task Status Updated": {
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock3 size={18} />,
  },

  "User Registered": {
    color: "bg-indigo-100 text-indigo-700",
    icon: <UserPlus size={18} />,
  },

  "User Updated": {
    color: "bg-blue-100 text-blue-700",
    icon: <Pencil size={18} />,
  },

  "User Deleted": {
    color: "bg-red-100 text-red-700",
    icon: <Trash2 size={18} />,
  },
};

export default function ActivityCard({
  activity,
}: Props) {
  const style =
    actionStyle[activity.action] ?? {
      color: "bg-gray-100 text-gray-700",
      icon: <Clock3 size={18} />,
    };

  return (
    <div className="relative pl-10 pb-8">

      {/* Timeline */}

      <div className="absolute left-4 top-3 h-full w-0.5 bg-gray-300" />

      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow">

        {style.icon}

      </div>

      {/* Card */}

      <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <span
            className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${style.color}`}
          >
            {activity.action}
          </span>

          <span className="text-sm text-gray-500">
            {new Date(activity.createdAt).toLocaleString()}
          </span>

        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {activity.description}
        </h3>

        <div className="mt-5 grid gap-3 text-sm md:grid-cols-3">

          <div>
            <p className="text-gray-500">
              User
            </p>

            <p className="font-medium">
              {activity.user?.name ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Project
            </p>

            <p className="font-medium">
              {activity.project?.name ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Task
            </p>

            <p className="font-medium">
              {activity.task?.title ?? "-"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}