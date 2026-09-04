import { AppError } from "@/utils";

import { CLASS_TYPES } from "./session.constants";
import type {
  AttendanceSession,
  ClassType,
  EditAttendanceSessionRequest,
  StartAttendanceSessionRequest,
} from "./session.types";

export function validateSessionId(sessionId: number): number {
  if (!Number.isInteger(sessionId) || sessionId <= 0) {
    throw new AppError("Invalid session id", 400);
  }

  return sessionId;
}

export function validateCourseOfferingId(courseOfferingId: number): number {
  if (!Number.isInteger(courseOfferingId) || courseOfferingId <= 0) {
    throw new AppError("Invalid course offering id", 400);
  }

  return courseOfferingId;
}

export function validateWeekNumber(weekNumber: number): number {
  if (!Number.isInteger(weekNumber) || weekNumber < 1 || weekNumber > 52) {
    throw new AppError("Week number must be an integer between 1 and 52", 400);
  }

  return weekNumber;
}

export function validateClassType(classType: string): ClassType {
  if (!CLASS_TYPES.includes(classType as ClassType)) {
    throw new AppError(`Class type must be one of: ${CLASS_TYPES.join(", ")}`, 400);
  }

  return classType as ClassType;
}

export function validateSessionTimes(
  sessionStartAt: string,
  sessionEndAt: string,
): { sessionStartAt: Date; sessionEndAt: Date } {
  const startDate = new Date(sessionStartAt);
  const endDate = new Date(sessionEndAt);

  if (Number.isNaN(startDate.getTime())) {
    throw new AppError("Invalid session start time", 400);
  }

  if (Number.isNaN(endDate.getTime())) {
    throw new AppError("Invalid session end time", 400);
  }

  if (endDate <= startDate) {
    throw new AppError("Session end time must be later than session start time", 400);
  }

  return { sessionStartAt: startDate, sessionEndAt: endDate };
}

export function validateLocation(latitude: number, longitude: number): { latitude: number; longitude: number } {
  if (typeof latitude !== "number" || Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
    throw new AppError("Latitude must be a number between -90 and 90", 400);
  }

  if (typeof longitude !== "number" || Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
    throw new AppError("Longitude must be a number between -180 and 180", 400);
  }

  return { latitude, longitude };
}

export function validateStartRequest(data: StartAttendanceSessionRequest) {
  const courseOfferingId = validateCourseOfferingId(data.courseOfferingId);
  const weekNumber = validateWeekNumber(data.weekNumber);
  const classType = validateClassType(data.classType);
  const { sessionStartAt, sessionEndAt } = validateSessionTimes(data.startTime, data.endTime);
  const { latitude, longitude } = validateLocation(data.latitude, data.longitude);

  return { courseOfferingId, weekNumber, classType, sessionStartAt, sessionEndAt, latitude, longitude };
}

export function validateEditRequest(data: EditAttendanceSessionRequest) {
  const weekNumber = validateWeekNumber(data.week_number);
  const classType = validateClassType(data.class_type);
  const { sessionStartAt, sessionEndAt } = validateSessionTimes(data.session_start_at, data.session_end_at);

  return { weekNumber, classType, sessionStartAt, sessionEndAt };
}

export function validateWithinEditableWindow(session: AttendanceSession): void {
  const now = new Date();

  if (now < session.startTime) {
    throw new AppError("Session cannot be edited before it starts", 400);
  }

  if (now > session.endTime) {
    throw new AppError("Session cannot be edited after its end time", 400);
  }
}
