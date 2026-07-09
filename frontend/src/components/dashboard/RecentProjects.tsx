"use client";

import Link from "next/link";

interface Project {
  _id: string;
  name: string;
  status: string;
  createdAt?: string;
}

interface Props {
  projects: Project[];
}

const statusColor: Record<string, string> = {
  Planning: "bg-gray-100 text-gray-700",

  Active: "bg-green-100 text-green-700",

  Completed: "bg-blue-100 text-blue-700",

  Archived: "bg-red-100 text-red-700",
};

export default function RecentProjects({
  projects,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-5">

        <div>

          <h2 className="text-lg font-bold">
            Recent Projects
          </h2>

          <p className="text-sm text-gray-500">
            Latest created projects
          </p>

        </div>

        <Link
          href="/projects"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </Link>

      </div>

      {/* Content */}

      <div>

        {projects.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No projects available
          </div>

        ) : (

          projects.map((project) => (

            <div
              key={project._id}
              className="flex items-center justify-between border-b p-5 transition hover:bg-gray-50 last:border-b-0"
            >

              <div>

                <h3 className="font-semibold text-gray-900">
                  {project.name}
                </h3>

                {project.createdAt && (

                  <p className="mt-1 text-sm text-gray-500">
                    Created{" "}
                    {new Date(
                      project.createdAt
                    ).toLocaleDateString()}
                  </p>

                )}

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  statusColor[
                    project.status
                  ] ??
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {project.status}
              </span>

            </div>

          ))

        )}

      </div>

    </div>
  );
}