"use client";

import { AttendanceScanAction } from "./attendance-scan-action";
import { NotificationsAction } from "./notifications-action";

export function DashboardTopbarActions() {
  return (
    <div className="flex items-center gap-1">
      <AttendanceScanAction />
      <NotificationsAction />
    </div>
  );
}
