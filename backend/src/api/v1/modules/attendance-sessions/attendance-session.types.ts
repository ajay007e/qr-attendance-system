import { ATTENDANCE_SESSION_STATUSES } from "./attendance-session.constants";

export type AttendanceSessionStatus = (typeof ATTENDANCE_SESSION_STATUSES)[number];

export interface AttendanceSession {
  id: number;
  courseId: number;
  lecturerId: number;
  status: AttendanceSessionStatus;
  sessionDate: string;
  startTime: Date;
  endTime: Date | null;
  durationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DatabaseAttendanceSession = Omit<AttendanceSession,
  "courseId" | "lecturerId" | "sessionDate" | "startTime" | "endTime" | "durationMinutes" | "createdAt" | "updatedAt"
> & {
  course_id: number;
  lecturer_id: number;
  session_date: string;
  start_time: Date;
  end_time: Date | null;
  duration_minutes: number;
  created_at: Date;
  updated_at: Date;
};

export interface StartAttendanceSessionData {
  course_id: number;
  lecturer_id: number;
  duration_minutes: number;
}

export interface StartAttendanceSessionRequest {
  durationMinutes?: number;
}