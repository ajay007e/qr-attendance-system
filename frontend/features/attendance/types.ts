export type ScanAttendanceRequest = {
  qrToken: string;
  latitude: number;
  longitude: number;
};

export type AttendanceRecordStatus = "present" | "absent" | "excused" | "late";

export type AttendanceMethod = "qr" | "manual";

export type AttendanceLocationStatus = "verified" | "suspicious" | "not_checked";

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
