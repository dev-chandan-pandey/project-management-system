"use client";

import { useEffect, useMemo, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import api from "@/services/api";
import KanbanColumn from "@/components/kanban/KanbanColumn";
import { useAuthStore } from "@/store/authStore";

interface User {
  _id: string;
  name: string;
  role: "Admin" | "Project Manager" | "Team Member";
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
  dueDate?: string;
  assignedTo?: User;
  project?: Project;
}

const columns: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Completed",
];

export default function KanbanPage() {
  const currentUser = useAuthStore(
    (state) => state.user
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks");

      setTasks(res.data.data.tasks);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const groupedTasks = useMemo(
    () => ({
      Todo: tasks.filter((t) => t.status === "Todo"),
      "In Progress": tasks.filter(
        (t) => t.status === "In Progress"
      ),
      Completed: tasks.filter(
        (t) => t.status === "Completed"
      ),
    }),
    [tasks]
  );

  const moveTask = async (
    taskId: string,
    newStatus: TaskStatus
  ) => {
    const currentTask = tasks.find(
      (task) => task._id === taskId
    );

    if (!currentTask) return;

    // No change
    if (currentTask.status === newStatus) {
      return;
    }

    // Team Member can only move assigned tasks
    if (
      currentUser?.role === "Team Member" &&
      currentTask.assignedTo?._id !== currentUser._id
    ) {
      alert(
        "You can only move tasks assigned to you."
      );
      return;
    }

    const previousTasks = [...tasks];

    setUpdating(true);

    // Optimistic update
    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );

    try {
      await api.put(`/tasks/${taskId}/status`, {
        status: newStatus,
      });

      // Refresh to keep populated data in sync
      await loadTasks();
    } catch (error: any) {
      console.error(error);

      setTasks(previousTasks);

      alert(
        error.response?.data?.message ??
          "Unable to update task."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDragEnd = async (
    event: DragEndEvent
  ) => {
    if (updating) return;

    const { active, over } = event;

    if (!over) return;

    const newStatus =
      over.id.toString() as TaskStatus;

    await moveTask(
      active.id.toString(),
      newStatus
    );
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-lg">
        Loading Kanban...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-10 text-center text-gray-500">
        No tasks available.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Kanban Board
          </h1>

          <p className="text-gray-500">
            Drag tasks across workflow stages.
          </p>
        </div>

        {updating && (
          <span className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700">
            Updating...
          </span>
        )}

      </div>

      <DndContext onDragEnd={handleDragEnd}>

        <div className="grid gap-6 lg:grid-cols-3">

          {columns.map((column) => (
            <KanbanColumn
              key={column}
              id={column}
              title={column}
              tasks={groupedTasks[column]}
            />
          ))}

        </div>

      </DndContext>

    </div>
  );
}