"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import ProjectCard from "@/components/projects/ProjectCard";
import ProjectModal from "@/components/projects/ProjectModal";
import Can from "@/components/auth/Can";

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects", {
        params: { search, status, page, limit: 6 },
      });
      setProjects(res.data.data.projects);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [search, status, page]);

  const createProject = async (data: ProjectFormData) => {
    try {
      await api.post("/projects", data);
      setModalOpen(false);
      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProject = async (data: ProjectFormData) => {
    if (!editingProject) return;
    try {
      await api.put(`/projects/${editingProject._id}`, {
        ...data,
        _id: editingProject._id,
      });
      setEditingProject(null);
      setModalOpen(false);
      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading Projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500">Manage all your projects</p>
        </div>
        <Can roles={["Admin", "Project Manager"]}>
          <button
            onClick={() => {
              setEditingProject(null);
              setModalOpen(true);
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            New Project
          </button>
        </Can>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          placeholder="Search Project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border p-3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">All Status</option>
          <option value="Planning">Planning</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border bg-white p-10 text-center text-gray-500">
          No Projects Found
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={deleteProject}
              onEdit={(project) => {
                setEditingProject(project);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ProjectModal
        open={modalOpen}
        project={editingProject ?? undefined}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(null);
        }}
        onSubmit={editingProject ? updateProject : createProject}
      />
    </div>
  );
}
