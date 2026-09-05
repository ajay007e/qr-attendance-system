import { AttendanceRecord, DatabaseAttendanceRecord } from "./attendance.types";

export const mapAttendanceRecord = (record: DatabaseAttendanceRecord): AttendanceRecord => ({
  id: record.id,
  sessionId: record.session_id,
  studentId: record.student_id,
  status: record.status,
  attendanceMethod: record.attendance_method,
  locationStatus: record.location_status,
  markedAt: record.marked_at,
  markedBy: record.marked_by,
  lecturerNote: record.lecturer_note,
  createdAt: record.created_at,
  updatedAt: record.updated_at,
});

export const mapAttendanceRecords = (records: DatabaseAttendanceRecord[]): AttendanceRecord[] =>
  records.map(mapAttendanceRecord);
