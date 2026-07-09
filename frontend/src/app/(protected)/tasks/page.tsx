"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import TaskCard from "@/components/tasks/TaskCard";
import TaskModal from "@/components/tasks/TaskModal";
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks", {
        params: {
          page,
          limit: 10,
          search,
          status,
          priority,
          assignedTo,
        },
      });

      setTasks(res.data.data.tasks);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
  try {
    const res = await api.get("/users", {
      params: {
        page: 1,
        limit: 1000,
      },
    });

    setUsers(res.data.data.users ?? []);
  } catch (error) {
    console.error(error);
    setUsers([]);
  }
};

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
    loadProjects();
  }, []);

  useEffect(() => {
    loadTasks();
  }, [search, status, priority, assignedTo, page]);

  const createTask = async (data: any) => {
    try {
      await api.post("/tasks", data);

      setModalOpen(false);

      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (data: any) => {
    try {
      await api.put(`/tasks/${editingTask?._id}`, data);

      setEditingTask(null);

      setModalOpen(false);

      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Delete task?")) return;

    try {
      await api.delete(`/tasks/${id}`);

      loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Tasks...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-500">
            Manage project tasks efficiently
          </p>

        </div>

        <Can roles={["Admin", "Project Manager"]}>
          <button
            onClick={() => {
              setEditingTask(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            New Task
          </button>
        </Can>

      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <input
          placeholder="Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Assigned User</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg border p-10 text-center text-gray-500">
          No Tasks Found
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onEdit={(task) => {
                setEditingTask(task);
                setModalOpen(true);
              }}
            />
          ))}

        </div>
      )}

      <div className="flex justify-center gap-3">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border rounded px-4 py-2"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="border rounded px-4 py-2"
        >
          Next
        </button>

      </div>

      <TaskModal
        open={modalOpen}
        task={editingTask ?? undefined}
        users={users}
        projects={projects}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? updateTask : createTask}
      />

    </div>
  );
}