"use client";

import { useEffect, useState } from "react";

type ProjectStatus = "Planning" | "Active" | "Completed" | "Archived";

interface Project {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}

interface ProjectFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}

interface Props {
  project?: Project;
  onSubmit: (data: ProjectFormData) => void;
}

const initialForm: ProjectFormData = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "Planning",
};

export default function ProjectForm({ project, onSubmit }: Props) {
  const [form, setForm] = useState<ProjectFormData>(initialForm);

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description,
        startDate: project.startDate ? project.startDate.substring(0, 10) : "",
        endDate: project.endDate ? project.endDate.substring(0, 10) : "",
        status: project.status,
      });
    } else {
      setForm(initialForm);
    }
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Project name is required.");
      return;
    }
    if (!form.description.trim()) {
      alert("Project description is required.");
      return;
    }
    if (!form.startDate) {
      alert("Please select a start date.");
      return;
    }
    if (!form.endDate) {
      alert("Please select an end date.");
      return;
    }
    if (form.endDate < form.startDate) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    onSubmit(form);
  };

  return (
    <div className="space-y-4">
      <input
        name="name"
        placeholder="Project Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={form.description}
        onChange={handleChange}
        rows={4}
        className="w-full resize-none rounded-lg border p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>
      </div>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
      >
        <option value="Planning">Planning</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Archived">Archived</option>
      </select>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        {project ? "Update Project" : "Create Project"}
      </button>
    </div>
  );
}
