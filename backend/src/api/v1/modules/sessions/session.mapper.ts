import type { AttendanceSession, DatabaseAttendanceSession } from "./session.types";

export function toAttendanceSession(session: DatabaseAttendanceSession): AttendanceSession {
  return {
    id: session.id,
    courseOfferingId: session.course_offering_id,
    lecturerId: session.lecturer_id,
    weekNumber: session.week_number,
    classType: session.class_type,
    sessionStartAt: session.session_start_at,
    sessionEndAt: session.session_end_at,
    latitude: session.latitude,
    longitude: session.longitude,
    attendanceStatus: session.attendance_status,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
  };
}
