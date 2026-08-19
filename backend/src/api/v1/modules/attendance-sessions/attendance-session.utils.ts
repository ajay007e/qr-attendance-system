import { AppError } from "@/utils";

import { DEFAULT_SESSION_DURATION_MINUTES, MAX_SESSION_DURATION_MINUTES } from "./attendance-session.constants";
import type { StartAttendanceSessionRequest } from "./attendance-session.types";

export function validateCourseId(courseId: number): number {
  if (!Number.isInteger(courseId) || courseId <= 0) {
    throw new AppError("Invalid course id", 400);
  }

  return courseId;
}

export function validateStartRequest(data: StartAttendanceSessionRequest): { durationMinutes: number } {
  const durationMinutes = data?.durationMinutes ?? DEFAULT_SESSION_DURATION_MINUTES;

  if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > MAX_SESSION_DURATION_MINUTES) {
    throw new AppError(`Session duration must be between 1 and ${MAX_SESSION_DURATION_MINUTES} minutes`, 400);
  }

  return { durationMinutes };
}