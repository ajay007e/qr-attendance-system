export type AttendanceSessionStatus = "open" | "closed" | "expired";

export type AttendanceSessionClassType = "lecture" | "laboratory" | "tutorial" | "workshop" | "seminar" | "other";

export interface AttendanceSession {
  id: number;
  offeringId: number;

  title: string;
  weekNumber: number;
  classNumber: number;
  classType: AttendanceSessionClassType;

  sessionStartAt: string;
  sessionEndAt: string;

  sessionStatus: AttendanceSessionStatus;
}

export type SessionForm = {
  title: string;
  startTime: string;
  endTime: string;
  weekNumber: number;
  classNumber: number;
  classType: AttendanceSessionClassType;
  latitude: number | null;
  longitude: number | null;
};

export interface CreateSessionRequest extends SessionForm {
  courseOfferingId: number;
}

export type UpdateSessionRequest = SessionForm;
