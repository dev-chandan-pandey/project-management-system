"use client";

import Can from "@/components/auth/Can";

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

interface Props {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const statusColor: Record<ProjectStatus, string> = {
  Planning: "bg-yellow-100 text-yellow-700",
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Archived: "bg-gray-200 text-gray-700",
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md">

      <div>

        <div className="flex items-start justify-between gap-3">

          <h2 className="text-lg font-semibold">
            {project.name}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[project.status]}`}
          >
            {project.status}
          </span>

        </div>

        <p className="mt-4 line-clamp-3 text-gray-600">
          {project.description}
        </p>

        <div className="mt-5 space-y-2 text-sm">

          <p>
            <span className="font-semibold">
              Start:
            </span>{" "}
            {project.startDate
              ? new Date(project.startDate).toLocaleDateString()
              : "-"}
          </p>

          <p>
            <span className="font-semibold">
              End:
            </span>{" "}
            {project.endDate
              ? new Date(project.endDate).toLocaleDateString()
              : "-"}
          </p>

        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <Can roles={["Admin", "Project Manager"]}>
          <button
            onClick={() => onEdit(project)}
            className="flex-1 rounded-lg bg-yellow-500 py-2 text-white transition hover:bg-yellow-600"
          >
            Edit
          </button>
        </Can>

        <Can roles={["Admin"]}>
          <button
            onClick={() => onDelete(project._id)}
            className="flex-1 rounded-lg bg-red-600 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </Can>

      </div>

    </div>
  );
}