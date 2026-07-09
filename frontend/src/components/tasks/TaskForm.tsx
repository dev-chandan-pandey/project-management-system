"use client";

import { useEffect, useState } from "react";

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
  task?: Task;
  users: User[];
  projects: Project[];
  onSubmit: (data: TaskFormData) => void;
}

const initialForm: TaskFormData = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Todo",
  dueDate: "",
  assignedTo: "",
  project: "",
};

export default function TaskForm({
  task,
  users,
  projects,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<TaskFormData>(initialForm);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
        assignedTo: task.assignedTo?._id ?? "",
        project: task.project?._id ?? "",
      });
    } else {
      setForm(initialForm);
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Task title is required.");
      return;
    }

    if (!form.project) {
      alert("Please select a project.");
      return;
    }

    if (!form.assignedTo) {
      alert("Please assign a team member.");
      return;
    }

    if (!form.dueDate) {
      alert("Please select a due date.");
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="space-y-4">

      <input
        name="title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="description"
        placeholder="Task Description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-lg border p-3 resize-none"
      />

      <select
        name="project"
        value={form.project}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="">Select Project</option>

        {projects.map((project) => (
          <option
            key={project._id}
            value={project._id}
          >
            {project.name}
          </option>
        ))}
      </select>

      <select
        name="assignedTo"
        value={form.assignedTo}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="">Assign Team Member</option>

        {users.map((user) => (
          <option
            key={user._id}
            value={user._id}
          >
            {user.name}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-4">

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="rounded-lg border p-3"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-lg border p-3"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

      </div>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        {task ? "Update Task" : "Create Task"}
      </button>

    </div>
  );
}