import { UserRole } from "@/features/auth";

export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  SUPER_ADMIN: "/dashboard",
  ADMIN: "/admin",
  LECTURER: "/lecturer",
  STUDENT: "/student",
};

export function getDashboardRoute(role: UserRole) {
  return DASHBOARD_ROUTES[role];
}
