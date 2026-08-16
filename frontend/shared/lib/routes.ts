import type { UserRole } from "@/shared";

export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  super_admin: "/dashboard",
  admin: "/dashboard",
  lecturer: "/lecturer",
  student: "/student",
};

export function getDashboardRoute(role: UserRole): string {
  return DASHBOARD_ROUTES[role];
}
