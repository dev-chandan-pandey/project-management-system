"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

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

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
  assignedTo?: User;
  project?: Project;
}

interface Props {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export default function KanbanColumn({
  id,
  title,
  tasks,
}: Props) {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border transition-all duration-200 p-5 min-h-[650px]
      ${
        isOver
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-gray-100"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow">
          {tasks.length}
        </span>

      </div>

      <div className="space-y-4">

        {tasks.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))
        )}

      </div>
    </div>
  );
}