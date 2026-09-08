import type { AttendanceLocationStatus, AttendanceMethod, AttendanceRecordStatus } from "./attendance.types";

export const ATTENDANCE_RECORD_COLUMNS = `
  id,
  session_id,
  student_id,
  status,
  attendance_method,
  location_status,
  marked_at,
  marked_by,
  lecturer_note,
  created_at,
  updated_at
`;

export const ATTENDANCE_STATUSES: AttendanceRecordStatus[] = ["present", "absent", "excused", "late"];

export const ATTENDANCE_METHODS: AttendanceMethod[] = ["qr", "manual"];

export const ATTENDANCE_LOCATION_STATUSES: AttendanceLocationStatus[] = ["verified", "suspicious", "not_checked"];

export const ATTENDANCE_EVENTS = {
  ATTENDANCE_MARKED: "attendance.marked",
} as const;
