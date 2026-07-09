"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";

type Role = "Admin" | "Project Manager" | "Team Member";

interface CanProps {
  roles: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

export default function Can({
  roles,
  children,
  fallback = null,
}: CanProps) {
  // const { user } = useAuthStore();

  // if (!user) return null;

  // if (!roles.includes(user.role as Role)) {
  //   return <>{fallback}</>;
  // }

  // return <>{children}</>;
//   const {
//   user,
//   loading,
// } = useAuthStore();
const user = useAuthStore((state) => state.user);
const loading = useAuthStore((state) => state.loading);
if (loading) {
  return null;
}

if (!user) {
  return <>{fallback}</>;
}

if (!roles.includes(user.role)) {
  return <>{fallback}</>;
}

return <>{children}</>;
}