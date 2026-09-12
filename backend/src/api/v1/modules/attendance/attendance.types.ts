import type { PaginationQuery } from "@/types";

export type AttendanceRecordStatus = "present" | "absent" | "excused" | "late";
export type AttendanceMethod = "qr" | "manual";
export type AttendanceLocationStatus = "verified" | "suspicious" | "not_checked";

export interface CreateAttendanceRecordData {
  session_id: number;
  student_id: number;
  status: AttendanceRecordStatus;
  attendance_method: AttendanceMethod;
  location_status: AttendanceLocationStatus;
}

export interface AttendanceRecord {
  id: number;
  sessionId: number;
  studentId: number;
  status: AttendanceRecordStatus;
  attendanceMethod: AttendanceMethod;
  locationStatus: AttendanceLocationStatus;
  markedAt: Date;
  markedBy: number | null;
  lecturerNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseAttendanceRecord {
  id: number;
  session_id: number;
  student_id: number;
  status: AttendanceRecordStatus;
  attendance_method: AttendanceMethod;
  location_status: AttendanceLocationStatus;
  marked_at: Date;
  marked_by: number | null;
  lecturer_note: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface MarkAttendanceQrRequest {
  qrToken: string;
  latitude: number;
  longitude: number;
}

export interface SessionAttendanceQuery extends PaginationQuery {
  search?: string;
  status?: AttendanceRecordStatus;
  attendanceMethod?: AttendanceMethod;
  locationStatus?: AttendanceLocationStatus;
}

export interface SessionAttendance {
  student: {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
  };

  attendance: AttendanceRecord | null;
}

export interface DatabaseSessionAttendance {
  student_id: number;
  student_first_name: string;
  student_last_name: string | null;
  student_email: string;

  attendance_id: number | null;
  attendance_session_id: number | null;
  attendance_student_id: number | null;
  attendance_status: AttendanceRecordStatus | null;
  attendance_method: AttendanceMethod | null;
  attendance_location_status: AttendanceLocationStatus | null;
  attendance_marked_at: Date | null;
  attendance_marked_by: number | null;
  attendance_lecturer_note: string | null;
  attendance_created_at: Date | null;
  attendance_updated_at: Date | null;
}

export type StudentAttendanceStatus = "present" | "absent";

export interface StudentAttendanceCursor {
  weekNumber: number;
  classType: string;
  classNumber: number;
  sessionStartAt: string;
  sessionId: number;
}

export interface StudentAttendanceQuery {
  limit?: number;
  cursor?: string;
  status?: StudentAttendanceStatus;
  classType?: string;
}

export interface StudentAttendanceRecord {
  id: number;
  weekNumber: number;
  classNumber: number;
  date: Date;
  classType: string;
  className: string;
  status: StudentAttendanceStatus;
  attendanceMethod: AttendanceMethod | null;
  locationStatus: AttendanceLocationStatus | null;
  markedAt: Date | null;
  markedBy: string | null;
  lecturerNote: string | null;
}

export interface DatabaseStudentAttendance {
  result_id: number;

  week_number: number;
  class_number: number;
  class_type: string;

  session_id: number;
  session_start_at: Date;
  title: string;

  attendance_id: number | null;
  attendance_status: AttendanceRecordStatus | null;
  attendance_method: AttendanceMethod | null;
  location_status: AttendanceLocationStatus | null;
  attendance_marked_at: Date | null;
  attendance_lecturer_note: string | null;

  marked_by_first_name: string | null;
  marked_by_last_name: string | null;

  attendance_exists: number;
}
