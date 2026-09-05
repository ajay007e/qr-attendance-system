import { DashboardGuard } from "@/features/auth";

import { DashboardTopbarActions } from "./client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard renderTopbarActions={<DashboardTopbarActions />}>{children}</DashboardGuard>;
}
