"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import ActivityTimeline from "@/components/activity/ActivityTimeline";

interface Activity {
  _id: string;
  action: string;
  description: string;
  createdAt: string;
  user?: {
    _id: string;
    name: string;
  };
  project?: {
    _id: string;
    name: string;
  };
  task?: {
    _id: string;
    title: string;
  };
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [action, setAction] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const loadActivities = async () => {
    try {
      setLoading(true);

      const res = await api.get("/activities", {
        params: {
          search,
          action,
          page,
          limit: 15,
        },
      });

      setActivities(res.data.data.activities);

      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [search, action, page]);

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Activity Timeline
          </h1>

          <p className="text-gray-500">
            View every action performed inside the system.
          </p>

        </div>

        <button
          onClick={loadActivities}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Refresh
        </button>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <input
          placeholder="Search activity..."
          className="rounded-lg border p-3"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={action}
          onChange={(e) => {
            setPage(1);
            setAction(e.target.value);
          }}
          className="rounded-lg border p-3"
        >
          <option value="">
            All Actions
          </option>

          <option>
            User Registered
          </option>

          <option>
            Project Created
          </option>

          <option>
            Project Updated
          </option>

          <option>
            Project Deleted
          </option>

          <option>
            Project Members Updated
          </option>

          <option>
            Task Created
          </option>

          <option>
            Task Updated
          </option>

          <option>
            Task Assigned
          </option>

          <option>
            Task Status Updated
          </option>

          <option>
            Task Completed
          </option>

          <option>
            Task Deleted
          </option>

          <option>
            User Updated
          </option>

          <option>
            User Deleted
          </option>

        </select>

      </div>

      {loading ? (

        <div className="rounded-xl border bg-white p-12 text-center">
          Loading activities...
        </div>

      ) : activities.length === 0 ? (

        <div className="rounded-xl border bg-white p-12 text-center text-gray-500">
          No activity found.
        </div>

      ) : (

        <ActivityTimeline
          activities={activities}
        />

      )}

      <div className="flex justify-center gap-4">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage((p) => p - 1)
          }
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="flex items-center">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage((p) => p + 1)
          }
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}