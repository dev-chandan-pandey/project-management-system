"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface User {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  name: string;
  status: string;
  members?: User[];
}

interface Props {
  open: boolean;
  user: User | null;

  onClose: () => void;

  onSuccess: () => void;
}

export default function AssignProjectModal({
  open,
  user,
  onClose,
  onSuccess,
}: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");

  const [members, setMembers] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");

      setProjects(res.data.data.projects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open) {
      loadProjects();
    }
  }, [open]);

  useEffect(() => {
    if (!selectedProject) {
      setMembers([]);
      return;
    }

    const project = projects.find(
      (p) => p._id === selectedProject
    );

    if (project) {
      setMembers(
        (project.members || []).map(
          (m) => m._id
        )
      );
    }
  }, [selectedProject, projects]);

  if (!open || !user) return null;

  const assigned = members.includes(user._id);

  const toggleAssignment = () => {
    if (assigned) {
      setMembers((prev) =>
        prev.filter((id) => id !== user._id)
      );
    } else {
      setMembers((prev) => [
        ...prev,
        user._id,
      ]);
    }
  };

  const submit = async () => {
    if (!selectedProject) return;

    try {
      setLoading(true);

      await api.put(
        `/projects/${selectedProject}/members`,
        {
          members,
        }
      );

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Assign Project
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label className="mb-2 block font-medium">
              Team Member
            </label>

            <input
              disabled
              value={user.name}
              className="w-full rounded-lg border bg-gray-100 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Project
            </label>

            <select
              value={selectedProject}
              onChange={(e) =>
                setSelectedProject(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Select Project
              </option>

              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.name}
                </option>
              ))}

            </select>

          </div>

          {selectedProject && (

            <div className="rounded-lg border p-4">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={assigned}
                  onChange={
                    toggleAssignment
                  }
                />

                <span>

                  Assign{" "}
                  <strong>
                    {user.name}
                  </strong>{" "}
                  to this project

                </span>

              </label>

            </div>

          )}

        </div>

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="rounded border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={
              loading ||
              !selectedProject
            }
            onClick={submit}
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}