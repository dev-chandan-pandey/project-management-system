"use client";

import Link from "next/link";

interface User {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  name: string;
}

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
  dueDate?: string;
  assignedTo?: User;
  project?: Project;
}

interface Props {
  tasks: Task[];
}

const priorityColor: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColor: Record<string, string> = {
  Todo: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

export default function LatestTasks({
  tasks,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-5">

        <div>

          <h2 className="text-lg font-bold">
            Latest Tasks
          </h2>

          <p className="text-sm text-gray-500">
            Recently created tasks
          </p>

        </div>

        <Link
          href="/tasks"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </Link>

      </div>

      {/* Body */}

      <div>

        {tasks.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No recent tasks
          </div>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              className="border-b p-5 transition hover:bg-gray-50 last:border-b-0"
            >

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h3 className="font-semibold text-gray-900">
                    {task.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {task.project?.name ?? "No Project"}
                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    priorityColor[task.priority] ??
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {task.priority}
                </span>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">

                    {task.assignedTo?.name
                      ? task.assignedTo.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "--"}

                  </div>

                  <div>

                    <p className="text-sm font-medium">
                      {task.assignedTo?.name ??
                        "Unassigned"}
                    </p>

                    {task.dueDate && (

                      <p className="text-xs text-gray-500">
                        Due{" "}
                        {new Date(
                          task.dueDate
                        ).toLocaleDateString()}
                      </p>

                    )}

                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusColor[task.status] ??
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {task.status}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}