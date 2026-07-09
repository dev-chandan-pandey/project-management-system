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
  users: User[];

  onEdit?: (user: User) => void;

  onAssign?: (user: User) => void;

  onDelete?: (id: string) => void;
}

const roleColor: Record<UserRole, string> = {
  Admin: "bg-red-100 text-red-700",
  "Project Manager":
    "bg-blue-100 text-blue-700",
  "Team Member":
    "bg-green-100 text-green-700",
};

export default function TeamTable({
  users,
  onEdit,
  onAssign,
  onDelete,
}: Props) {
  const currentUser = useAuthStore(
    (state) => state.user
  );

  return (
    <div className="hidden overflow-x-auto rounded-xl border bg-white shadow lg:block">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Role
            </th>

            <th className="p-4 text-center">
              Projects
            </th>

            <th className="p-4 text-center">
              Tasks
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4 font-medium">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">

                <span
                  className={`rounded-full px-3 py-1 text-sm ${roleColor[user.role]}`}
                >
                  {user.role}
                </span>

              </td>

              <td className="p-4 text-center">
                {user.assignedProjects.length}
              </td>

              <td className="p-4 text-center">
                {user.assignedTasks.length}
              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  {/* Admin */}

                  {currentUser?.role ===
                    "Admin" && (
                    <>
                      <button
                        onClick={() =>
                          onEdit?.(user)
                        }
                        className="rounded bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          onAssign?.(user)
                        }
                        className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        Projects
                      </button>

                      <button
                        onClick={() =>
                          onDelete?.(
                            user._id
                          )
                        }
                        className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {/* Project Manager */}

                  {currentUser?.role ===
                    "Project Manager" && (
                    <button
                      onClick={() =>
                        onAssign?.(user)
                      }
                      className="rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Assign
                    </button>
                  )}

                  {/* Team Member */}

                  {currentUser?.role ===
                    "Team Member" && (
                    <span className="text-sm text-gray-400">
                      View Only
                    </span>
                  )}

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}