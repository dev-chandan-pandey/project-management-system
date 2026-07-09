import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  Users,
  LayoutDashboard,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

          <h1 className="text-2xl font-bold text-blue-600">
            TaskFlow
          </h1>

          <div className="flex gap-3">

            <Link
              href="/login"
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Link>

          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              Project Collaboration Platform
            </span>

            <h1 className="text-5xl font-bold leading-tight">

              Manage Projects,
              <br />
              Track Tasks,
              <br />
              Collaborate Better.

            </h1>

            <p className="text-gray-600 text-lg mt-6">

              A modern project collaboration system inspired by Jira,
              Trello and ClickUp. Create projects, assign tasks,
              manage teams, and monitor progress from a single dashboard.

            </p>

            <div className="flex gap-4 mt-10">

              <Link
                href="/register"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                className="px-6 py-3 rounded-lg border hover:bg-gray-100"
              >
                Sign In
              </Link>

            </div>

          </div>

          {/* Dashboard Preview */}

          <div className="bg-white rounded-2xl shadow-xl border p-8">

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-xl bg-blue-50 p-5">

                <LayoutDashboard className="text-blue-600 mb-4" />

                <h3 className="font-bold text-3xl">
                  12
                </h3>

                <p>Total Projects</p>

              </div>

              <div className="rounded-xl bg-green-50 p-5">

                <FolderKanban className="text-green-600 mb-4" />

                <h3 className="font-bold text-3xl">
                  84
                </h3>

                <p>Total Tasks</p>

              </div>

              <div className="rounded-xl bg-purple-50 p-5">

                <Users className="text-purple-600 mb-4" />

                <h3 className="font-bold text-3xl">
                  16
                </h3>

                <p>Team Members</p>

              </div>

              <div className="rounded-xl bg-yellow-50 p-5">

                <CheckCircle2 className="text-yellow-600 mb-4" />

                <h3 className="font-bold text-3xl">
                  68
                </h3>

                <p>Completed</p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">

            Everything You Need

          </h2>

          <p className="text-center text-gray-600 mt-4">

            Manage projects from planning to completion.

          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[
              {
                title: "Project Management",
                desc: "Create, update and manage projects efficiently.",
              },
              {
                title: "Task Tracking",
                desc: "Assign tasks and monitor progress easily.",
              },
              {
                title: "Kanban Board",
                desc: "Drag & drop tasks across workflow stages.",
              },
              {
                title: "Team Collaboration",
                desc: "Work together with managers and members.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold mb-5">
                  ✓
                </div>

                <h3 className="font-bold text-xl">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-20 bg-blue-600 text-white">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">

            Ready to Organize Your Team?

          </h2>

          <p className="mt-5 text-blue-100 text-lg">

            Start managing projects, assigning tasks, and collaborating
            with your team today.

          </p>

          <div className="flex justify-center gap-4 mt-10">

            <Link
              href="/register"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-gray-400 py-6">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">

          <p>
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>

          <p>
            Built with Next.js, Express.js & MongoDB
          </p>

        </div>

      </footer>

    </main>
  );
}