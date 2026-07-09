"use client";

import { useEffect } from "react";
import ProjectForm from "./ProjectForm";

type ProjectStatus =
  | "Planning"
  | "Active"
  | "Completed"
  | "Archived";

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
  open: boolean;
  onClose: () => void;
  project?: Project;
  onSubmit: (data: ProjectFormData) => void;
}

export default function ProjectModal({
  open,
  onClose,
  project,
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
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-xl font-semibold">
              {project ? "Edit Project" : "Create New Project"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {project
                ? "Update the project details."
                : "Fill in the project information."}
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

          <ProjectForm
            project={project}
            onSubmit={onSubmit}
          />

        </div>

      </div>
    </div>
  );
}