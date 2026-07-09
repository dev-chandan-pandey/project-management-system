"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

import MetricCard from "@/components/dashboard/MetricCard";
import RecentProjects from "@/components/dashboard/RecentProjects";
import LatestTasks from "@/components/dashboard/LatestTasks";
import TaskStatusChart from "@/components/dashboard/TaskStatusChart";

interface DashboardData {
  metrics: {
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
    todoTasks: number;
    inProgressTasks: number;
    totalMembers: number;
  };
  charts: {
    tasksByStatus: any[];
  };
  recentProjects: any[];
  latestTasks: any[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading Dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10">
        Unable to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to your Project Collaboration System
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        <Link href="/projects">
          <MetricCard
            title="Projects"
            value={data.metrics.totalProjects}
          />
        </Link>

        <Link href="/tasks">
          <MetricCard
            title="Tasks"
            value={data.metrics.totalTasks}
          />
        </Link>

        <Link href="/tasks?status=Completed">
          <MetricCard
            title="Completed"
            value={data.metrics.completedTasks}
          />
        </Link>

        <Link href="/tasks?status=Todo">
          <MetricCard
            title="Todo"
            value={data.metrics.todoTasks}
          />
        </Link>

        <Link href="/tasks?status=In Progress">
          <MetricCard
            title="In Progress"
            value={data.metrics.inProgressTasks}
          />
        </Link>

        <Link href="/team">
          <MetricCard
            title="Members"
            value={data.metrics.totalMembers}
          />
        </Link>

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        <TaskStatusChart
          data={data.charts.tasksByStatus}
        />

        <RecentProjects
          projects={data.recentProjects}
        />

        <LatestTasks
          tasks={data.latestTasks}
        />

      </div>

    </div>
  );
}