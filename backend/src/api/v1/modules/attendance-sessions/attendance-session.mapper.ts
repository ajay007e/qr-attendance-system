import type { AttendanceSession, DatabaseAttendanceSession } from "./attendance-session.types";

export function toAttendanceSession(session: DatabaseAttendanceSession): AttendanceSession {
  return {
    id: session.id,
    courseId: session.course_id,
    lecturerId: session.lecturer_id,
    status: session.status,
    sessionDate: session.session_date,
    startTime: session.start_time,
    endTime: session.end_time,
    durationMinutes: session.duration_minutes,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
  };
}