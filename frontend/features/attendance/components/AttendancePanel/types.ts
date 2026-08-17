import type { UserRole } from "@/shared";
import type { ReactNode } from "react";

export type AttendanceRole = Extract<UserRole, "lecturer" | "student">;

export interface AttendancePanelProps {
  courseId: number;
  role: AttendanceRole;

  /**
   * Session controls owned by the sessions feature.
   * Lecturer only.
   *
   * Includes:
   * - Start session
   * - Stop session
   * - Show QR
   */
  sessionControls?: ReactNode;

  /**
   * Previous attendance/session history.
   * Lecturer only.
   *
   * Includes:
   * - Previous sessions
   * - Session attendance summary
   * - Reopen closed session
   */
  previousSessions?: ReactNode;

  /**
   * Live attendance for the currently active session.
   * Lecturer only.
   *
   * Includes:
   * - Current session statistics
   * - Live attendance table
   * - Manual attendance
   */
  liveAttendance?: ReactNode;

  /**
   * Student attendance content.
   *
   * Includes:
   * - Attendance summary
   * - Attendance records
   */
  studentAttendance?: ReactNode;
}
