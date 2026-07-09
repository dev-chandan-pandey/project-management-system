"use client";

import { useAuthStore } from "@/store/authStore";

interface Project {
  _id: string;
  name: string;
  status: string;
}

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
}

type UserRole =
  | "Admin"
  | "Project Manager"
  | "Team Member";

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedProjects: Project[];
  assignedTasks: Task[];
}

interface Props {
  user: User;

  onEdit?: (user: User) => void;

  onAssign?: (user: User) => void;

  onDelete?: (id: string) => void;
}

const roleColor: Record<UserRole, string> = {
  Admin: "bg-red-100 text-red-700",
  "Project Manager": "bg-blue-100 text-blue-700",
  "Team Member": "bg-green-100 text-green-700",
};

export default function TeamCard({
  user,
  onEdit,
  onAssign,
  onDelete,
}: Props) {
  const currentUser = useAuthStore(
    (state) => state.user
  );

  return (
    <div className="rounded-xl border bg-white p-5 shadow">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-lg font-semibold">
            {user.name}
          </h2>

          <p className="text-sm text-gray-500">
            {user.email}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${roleColor[user.role]}`}
        >
          {user.role}
        </span>

      </div>

      {/* Projects */}

      <div className="mt-5">

        <h3 className="mb-2 font-semibold">
          Projects
        </h3>

        {user.assignedProjects.length ? (

          <div className="flex flex-wrap gap-2">

            {user.assignedProjects.map(
              (project) => (
                <span
                  key={project._id}
                  className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                >
                  {project.name}
                </span>
              )
            )}

          </div>

        ) : (

          <p className="text-sm text-gray-400">
            No assigned projects
          </p>

        )}

      </div>

      {/* Tasks */}

      <div className="mt-5">

        <h3 className="mb-2 font-semibold">
          Tasks
        </h3>

        {user.assignedTasks.length ? (

          <div className="space-y-2">

            {user.assignedTasks.map((task) => (

              <div
                key={task._id}
                className="rounded border p-2"
              >
                <div className="font-medium">
                  {task.title}
                </div>

                <div className="text-xs text-gray-500">
                  {task.status} • {task.priority}
                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-sm text-gray-400">
            No assigned tasks
          </p>

        )}

      </div>

      {/* Actions */}

      <div className="mt-6 flex flex-wrap gap-2">

        {currentUser?.role === "Admin" && (
          <>
            <button
              onClick={() => onEdit?.(user)}
              className="rounded bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600"
            >
              Edit
            </button>

            <button
              onClick={() => onAssign?.(user)}
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Assign
            </button>

            <button
              onClick={() =>
                onDelete?.(user._id)
              }
              className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Delete
            </button>
          </>
        )}

        {currentUser?.role ===
          "Project Manager" && (
          <button
            onClick={() => onAssign?.(user)}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Assign
          </button>
        )}

        {currentUser?.role ===
          "Team Member" && (
          <span className="text-sm text-gray-500">
            View Only
          </span>
        )}

      </div>

    </div>
  );
}