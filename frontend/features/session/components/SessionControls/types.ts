import type { AttendanceSession } from "@/features/attendance";

export interface SessionControlProps {
  courseOfferingId: number;
  onSessionChange?: (session: AttendanceSession | null) => void;
}
