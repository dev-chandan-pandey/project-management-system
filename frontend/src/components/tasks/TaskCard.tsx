"use client";

import Can from "@/components/auth/Can";

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
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Completed";
  dueDate: string;
  assignedTo?: User;
  project?: Project;
}

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColor = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColor = {
  Todo: "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between">

      <div>

        <div className="flex items-start justify-between gap-3">

          <h2 className="font-semibold text-lg">
            {task.title}
          </h2>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              priorityColor[task.priority]
            }`}
          >
            {task.priority}
          </span>

        </div>

        <p className="text-gray-600 mt-3 line-clamp-3">
          {task.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColor[task.status]
            }`}
          >
            {task.status}
          </span>

        </div>

        <div className="mt-5 space-y-2 text-sm">

          <p>
            <span className="font-semibold">
              Project:
            </span>{" "}
            {task.project?.name ?? "-"}
          </p>

          <p>
            <span className="font-semibold">
              Assigned:
            </span>{" "}
            {task.assignedTo?.name ?? "Unassigned"}
          </p>

          <p>
            <span className="font-semibold">
              Due:
            </span>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "-"}
          </p>

        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <Can roles={["Admin", "Project Manager"]}>
          <button
            onClick={() => onEdit(task)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
          >
            Edit
          </button>
        </Can>

        <Can roles={["Admin"]}>
          <button
            onClick={() => onDelete(task._id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            Delete
          </button>
        </Can>

      </div>

    </div>
  );
}