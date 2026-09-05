import { ATTENDANCE_SESSION_STATUSES, CLASS_TYPES } from "./session.constants";

export type SessionStatus = (typeof ATTENDANCE_SESSION_STATUSES)[number];

export type ClassType = (typeof CLASS_TYPES)[number];

export interface AttendanceSession {
  id: number;
  courseOfferingId: number;
  lecturerId: number;
  weekNumber: number;
  classType: ClassType;
  startTime: Date;
  endTime: Date;
  latitude: number;
  longitude: number;
  sessionStatus: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type DatabaseAttendanceSession = Omit<
  AttendanceSession,
  | "courseOfferingId"
  | "lecturerId"
  | "weekNumber"
  | "classType"
  | "startTime"
  | "endTime"
  | "sessionStatus"
  | "createdAt"
  | "updatedAt"
> & {
  course_offering_id: number;
  lecturer_id: number;
  week_number: number;
  class_type: ClassType;
  session_start_at: Date;
  session_end_at: Date;
  session_status: SessionStatus;
  created_at: Date;
  updated_at: Date;
};

export type CreateAttendanceSessionData = Omit<
  DatabaseAttendanceSession,
  "id" | "session_status" | "created_at" | "updated_at"
>;

export type UpdateAttendanceSessionData = Pick<
  DatabaseAttendanceSession,
  "week_number" | "class_type" | "session_start_at" | "session_end_at"
>;

export interface StartAttendanceSessionRequest {
  courseOfferingId: number;
  weekNumber: number;
  classType: string;
  startTime: string;
  endTime: string;
  latitude: number;
  longitude: number;
}

export interface EditAttendanceSessionRequest {
  week_number: number;
  class_type: string;
  session_start_at: string;
  session_end_at: string;
}

export interface StartSessionInput {
  courseOfferingId: number;
  weekNumber: number;
  classType: ClassType;
  sessionStartAt: Date;
  sessionEndAt: Date;
  latitude: number;
  longitude: number;
}

export interface EditSessionInput {
  weekNumber: number;
  classType: ClassType;
  sessionStartAt: Date;
  sessionEndAt: Date;
}
