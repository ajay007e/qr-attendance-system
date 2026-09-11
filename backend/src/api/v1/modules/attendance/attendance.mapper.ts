import type {
  AttendanceRecord,
  DatabaseAttendanceRecord,
  DatabaseSessionAttendance,
  SessionAttendance,
} from "./attendance.types";

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

export const mapSessionAttendance = (record: DatabaseSessionAttendance): SessionAttendance => {
  if (record.attendance_id === null) {
    return {
      student: {
        id: record.student_id,
        firstName: record.student_first_name,
        lastName: record.student_last_name,
        email: record.student_email,
      },
      attendance: null,
    };
  }

  const attendance: AttendanceRecord = {
    id: record.attendance_id,
    sessionId: record.attendance_session_id!,
    studentId: record.attendance_student_id!,
    status: record.attendance_status!,
    attendanceMethod: record.attendance_method!,
    locationStatus: record.attendance_location_status!,
    markedAt: record.attendance_marked_at!,
    markedBy: record.attendance_marked_by,
    lecturerNote: record.attendance_lecturer_note,
    createdAt: record.attendance_created_at!,
    updatedAt: record.attendance_updated_at!,
  };

  return {
    student: {
      id: record.student_id,
      firstName: record.student_first_name,
      lastName: record.student_last_name,
      email: record.student_email,
    },
    attendance,
  };
};

export const mapSessionAttendances = (records: DatabaseSessionAttendance[]): SessionAttendance[] =>
  records.map(mapSessionAttendance);
