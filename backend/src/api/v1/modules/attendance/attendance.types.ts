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
