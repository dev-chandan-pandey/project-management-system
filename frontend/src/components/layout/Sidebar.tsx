"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Activity,
  Columns3,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

type UserRole = "Admin" | "Project Manager" | "Team Member";

interface MenuItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const menus: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["Admin", "Project Manager", "Team Member"],
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderKanban,
    roles: ["Admin", "Project Manager"],
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    roles: ["Admin", "Project Manager", "Team Member"],
  },
  {
    name: "Kanban",
    href: "/kanban",
    icon: Columns3,
    roles: ["Admin", "Project Manager", "Team Member"],
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
    roles: ["Admin"],
  },
  {
    name: "Activity",
    href: "/activity",
    icon: Activity,
    roles: ["Admin", "Project Manager"],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // const { user, logout } = useAuthStore();
const user = useAuthStore((state) => state.user);
const logout = useAuthStore((state) => state.logout);
  const visibleMenus = menus.filter((menu) =>
    user ? menu.roles.includes(user.role) : false
  );

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
          TaskFlow
        </h1>

        {user && (
          <div className="mt-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-slate-400">
              {user.role}
            </p>
          </div>
        )}

      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">

        {visibleMenus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${
                pathname === menu.href
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {menu.name}
            </Link>
          );
        })}

      </nav>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}