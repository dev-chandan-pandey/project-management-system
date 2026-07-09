"use client";

import { useEffect } from "react";
import TaskForm from "./TaskForm";

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

interface TaskFormData {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Completed";
  dueDate: string;
  assignedTo: string;
  project: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  task?: Task;
  users: User[];
  projects: Project[];
  onSubmit: (data: TaskFormData) => void;
}

export default function TaskModal({
  open,
  onClose,
  task,
  users,
  projects,
  onSubmit,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-semibold">
              {task ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {task
                ? "Update the task information."
                : "Fill in the task details."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <TaskForm
            task={task}
            users={users}
            projects={projects}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}