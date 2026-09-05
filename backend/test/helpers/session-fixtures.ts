import type {
  AttendanceSession,
  DatabaseAttendanceSession,
  StartSessionInput,
} from "../../src/api/v1/modules/sessions/session.types";

export const sessionNow = new Date("2026-09-05T02:30:00.000Z");

export const sessionInput: StartSessionInput = {
  courseOfferingId: 11,
  weekNumber: 6,
  classType: "lecture",
  sessionStartAt: new Date("2026-09-05T02:00:00.000Z"),
  sessionEndAt: new Date("2026-09-05T03:00:00.000Z"),
  latitude: -34.405,
  longitude: 150.878,
};

export const databaseSession: DatabaseAttendanceSession = {
  id: 41,
  course_offering_id: sessionInput.courseOfferingId,
  lecturer_id: 31,
  week_number: sessionInput.weekNumber,
  class_type: sessionInput.classType,
  session_start_at: sessionInput.sessionStartAt,
  session_end_at: sessionInput.sessionEndAt,
  latitude: sessionInput.latitude,
  longitude: sessionInput.longitude,
  session_status: "open",
  created_at: new Date("2026-09-05T01:59:00.000Z"),
  updated_at: new Date("2026-09-05T02:00:00.000Z"),
};

export const mappedSession: AttendanceSession = {
  id: 41,
  courseOfferingId: 11,
  lecturerId: 31,
  weekNumber: 6,
  classType: "lecture",
  startTime: sessionInput.sessionStartAt,
  endTime: sessionInput.sessionEndAt,
  latitude: sessionInput.latitude,
  longitude: sessionInput.longitude,
  sessionStatus: "open",
  createdAt: databaseSession.created_at,
  updatedAt: databaseSession.updated_at,
};
