"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import TeamTable from "@/components/team/TeamTable";
import TeamCard from "@/components/team/TeamCard";

interface Project {
  _id: string;
  name: string;
  status: string;
}

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
}

type UserRole =
  | "Admin"
  | "Project Manager"
  | "Team Member";

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedProjects: Project[];
  assignedTasks: Task[];
}

export default function TeamPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users", {
        params: {
          search,
          role,
          page,
          limit: 10,
        },
      });

      setUsers(res.data.data.users);

      setTotalPages(
        res.data.data.totalPages
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search, role, page]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Team...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Team Management
          </h1>

          <p className="text-gray-500">
            Manage your organization members.
          </p>

        </div>

        <div className="flex gap-3">

          <input
            placeholder="Search member..."
            className="rounded-lg border p-3"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            value={role}
            onChange={(e) => {
              setPage(1);
              setRole(e.target.value);
            }}
            className="rounded-lg border p-3"
          >
            <option value="">
              All Roles
            </option>

            <option value="Admin">
              Admin
            </option>

            <option value="Project Manager">
              Project Manager
            </option>

            <option value="Team Member">
              Team Member
            </option>

          </select>

        </div>

      </div>

      {users.length === 0 ? (
        <div className="rounded-lg border bg-white p-10 text-center text-gray-500">
          No users found.
        </div>
      ) : (
        <>
          <TeamTable users={users} />

          <div className="grid gap-6 md:grid-cols-2 xl:hidden">

            {users.map((user) => (
              <TeamCard
                key={user._id}
                user={user}
              />
            ))}

          </div>
        </>
      )}

      <div className="flex items-center justify-center gap-4">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}