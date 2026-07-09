"use client";

import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import { useAuthStore } from "@/store/authStore";

interface User {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  name: string;
}

type TaskStatus =
  | "Todo"
  | "In Progress"
  | "Completed";

type TaskPriority =
  | "Low"
  | "Medium"
  | "High";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  assignedTo?: User;
  project?: Project;
}

interface Props {
  task: Task;
}

const priorityColor: Record<TaskPriority, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function TaskCard({
  task,
}: Props) {
  const user = useAuthStore((state) => state.user);

  const canDrag =
    !!user &&
    (
      user.role === "Admin" ||
      user.role === "Project Manager" ||
      task.assignedTo?._id === user._id
    );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task._id,
    disabled: !canDrag,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.55 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        rounded-xl
        border
        bg-white
        p-4
        shadow-sm
        transition-all
        hover:shadow-md
        ${
          canDrag
            ? "cursor-grab active:cursor-grabbing"
            : "cursor-not-allowed opacity-70"
        }
        ${
          isDragging
            ? "ring-2 ring-blue-500 shadow-lg"
            : ""
        }
      `}
    >
      <div className="flex items-start justify-between">

        <h3 className="font-semibold text-gray-900">
          {task.title}
        </h3>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      <p className="mt-3 line-clamp-3 text-sm text-gray-600">
        {task.description}
      </p>

      <div className="mt-4 space-y-2 text-sm">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Project
          </span>

          <span className="font-medium">
            {task.project?.name ?? "-"}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Assigned
          </span>

          <span className="font-medium">
            {task.assignedTo?.name ?? "-"}
          </span>

        </div>

        {task.dueDate && (
          <div className="flex justify-between">

            <span className="text-gray-500">
              Due
            </span>

            <span className="font-medium">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>

          </div>
        )}

      </div>

      {!canDrag && (
        <p className="mt-4 text-xs text-red-500">
          You can only move tasks assigned to you.
        </p>
      )}
    </div>
  );
}