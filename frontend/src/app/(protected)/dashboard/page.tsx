"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FolderKanban,
  CheckSquare,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Archive,
  Users,
} from "lucide-react";

import api from "@/services/api";
import ProjectStatusChart from "@/components/dashboard/ProjectStatusChart";
import MetricCard from "@/components/dashboard/MetricCard";
import RecentProjects from "@/components/dashboard/RecentProjects";
import LatestTasks from "@/components/dashboard/LatestTasks";
import TaskStatusChart from "@/components/dashboard/TaskStatusChart";
import RecentActivity from "@/components/dashboard/RecentActivity";

interface DashboardData {
  metrics: {
    totalProjects: number;
    totalTasks: number;
    completedTasks: number;
    todoTasks: number;
    inProgressTasks: number;
    archivedProjects: number;
    totalMembers: number;
  };

  charts: {
    tasksByStatus: any[];
    tasksByPriority: any[];
    projectsByStatus: any[];
  };

  latestTasks: any[];

  recentProjects: any[];

  recentActivities: any[];

  currentUser: {
    name: string;
    role: string;
  };
}

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res =
        await api.get("/dashboard");

      setDashboard(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="py-24 text-center">
        Dashboard unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-2">

        <h1 className="text-4xl font-bold">

          Welcome,

          {" "}

          {dashboard.currentUser.name}

          👋

        </h1>

        <p className="text-gray-500">

          {dashboard.currentUser.role}

          Dashboard

        </p>

      </div>

      {/* Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">

        <Link href="/projects">

          <MetricCard
            title="Projects"
            value={dashboard.metrics.totalProjects}
            icon={<FolderKanban size={22} />}
            color="bg-indigo-600"
          />

        </Link>

        <Link href="/tasks">

          <MetricCard
            title="Tasks"
            value={dashboard.metrics.totalTasks}
            icon={<CheckSquare size={22} />}
            color="bg-blue-600"
          />

        </Link>

        <Link href="/tasks?status=Completed">

          <MetricCard
            title="Completed"
            value={dashboard.metrics.completedTasks}
            icon={<CheckCircle2 size={22} />}
            color="bg-green-600"
          />

        </Link>

        <Link href="/tasks?status=Todo">

          <MetricCard
            title="Todo"
            value={dashboard.metrics.todoTasks}
            icon={<Clock3 size={22} />}
            color="bg-yellow-500"
          />

        </Link>

        <Link href="/tasks?status=In Progress">

          <MetricCard
            title="In Progress"
            value={dashboard.metrics.inProgressTasks}
            icon={<LoaderCircle size={22} />}
            color="bg-cyan-600"
          />

        </Link>

        <Link href="/projects">

          <MetricCard
            title="Archived"
            value={dashboard.metrics.archivedProjects}
            icon={<Archive size={22} />}
            color="bg-red-600"
          />

        </Link>

        <Link href="/team">

          <MetricCard
            title="Members"
            value={dashboard.metrics.totalMembers}
            icon={<Users size={22} />}
            color="bg-purple-600"
          />

        </Link>

      </div>

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">

        <TaskStatusChart
          data={dashboard.charts.tasksByStatus}
        />


        <ProjectStatusChart
          data={dashboard.charts.projectsByStatus}
        />

      </div>

      {/* <div className="grid gap-6 lg:grid-cols-2">

        <RecentProjects
          projects={dashboard.recentProjects}
        />

        <LatestTasks
          tasks={dashboard.latestTasks}
        />

      </div> */}

      {/* Lists */}

      <div className="grid gap-6 xl:grid-cols-2">

        <RecentProjects
          projects={
            dashboard.recentProjects
          }
        />

        <LatestTasks
          tasks={
            dashboard.latestTasks
          }
        />
       

      </div>
     <RecentActivity
  activities={dashboard.recentActivities}
/>
    </div>
  );
}