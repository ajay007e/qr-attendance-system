import type { ReactNode } from "react";
import { ATTENDANCE_TABS } from "@/features/attendance";

export interface LecturerAttendanceViewProps {
  offeringId: number;
  isSessionOpen: boolean;
  sessionControls: ReactNode;
}

export type AttendanceTab = (typeof ATTENDANCE_TABS)[number]["key"];
