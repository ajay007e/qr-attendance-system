export type AttendanceSessionStatus = "open" | "closed" | "expired";

export type AttendanceSessionClassType = "lecture" | "laboratory" | "tutorial" | "workshop" | "seminar" | "other";

export interface AttendanceSession {
  id: number;
  offeringId: number;

  title: string;
  weekNumber: number;
  classType: AttendanceSessionClassType;

  sessionStartAt: string;
  sessionEndAt: string;

  status: AttendanceSessionStatus;
}

export interface SessionForm {
  title: string;
  startTime: string;
  endTime: string;
  weekNumber: number;
  classType: AttendanceSessionClassType;
}

export interface CreateSessionRequest extends SessionForm {
  courseOfferingId: number;
}

export type UpdateSessionRequest = SessionForm;
