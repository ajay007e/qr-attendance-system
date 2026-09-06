import type { AttendanceSession, DatabaseAttendanceSession } from "./session.types";

export function toAttendanceSession(session: DatabaseAttendanceSession): AttendanceSession {
  return {
    id: session.id,
    title: session.title,
    courseOfferingId: session.course_offering_id,
    lecturerId: session.lecturer_id,
    weekNumber: session.week_number,
    classNumber: session.class_number,
    classType: session.class_type,
    startTime: session.session_start_at,
    endTime: session.session_end_at,
    latitude: session.latitude,
    longitude: session.longitude,
    sessionStatus: session.session_status,
    createdAt: session.created_at,
    updatedAt: session.updated_at,
  };
}
