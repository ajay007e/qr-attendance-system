import { AppError } from "@/utils";

import type { CourseLecturerRole } from "./offering.types";

import { COURSE_OFFERING_STATUSES, COURSE_SESSIONS, COURSE_LECTURER_ROLES } from "./offering.constants";

import type {
  CourseOfferingStatus,
  CreateCourseOfferingRequest,
  UpdateCourseOfferingRequest,
  CourseSession,
} from "./offering.types";

export function validateCourseOfferingId(id: number): number {
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Invalid course offering id", 400);
  }

  return id;
}

function validateCourseId(courseId: number): number {
  if (!Number.isInteger(courseId) || courseId <= 0) {
    throw new AppError("Invalid course id", 400);
  }

  return courseId;
}

function validateAcademicYear(academicYear: number): number {
  if (!Number.isInteger(academicYear) || academicYear < 2000) {
    throw new AppError("Invalid academic year", 400);
  }

  return academicYear;
}

function validateSession(session: CourseSession): CourseSession {
  if (!COURSE_SESSIONS.includes(session)) {
    throw new AppError("Invalid course session", 400);
  }

  return session;
}

function validateDate(value: string | null | undefined, fieldName: string): string | null | undefined {
  if (value === undefined || value === null) {
    return value;
  }

  if (!value.trim()) {
    throw new AppError(`${fieldName} cannot be empty`, 400);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new AppError(`Invalid ${fieldName}`, 400);
  }

  return value;
}

function validateDateRange(startDate: string | null | undefined, endDate: string | null | undefined): void {
  if (!startDate || !endDate) {
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new AppError("Start date cannot be after end date", 400);
  }
}

export function validateCreateCourseOfferingRequest(data: CreateCourseOfferingRequest): CreateCourseOfferingRequest {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const courseId = validateCourseId(data.courseId);
  const academicYear = validateAcademicYear(data.academicYear);
  const session = validateSession(data.session);

  const startDate = validateDate(data.startDate, "start date");
  const endDate = validateDate(data.endDate, "end date");

  validateDateRange(startDate, endDate);

  return {
    courseId,
    academicYear,
    session,
    startDate: startDate ?? undefined,
    endDate: endDate ?? undefined,
  };
}

export function validateUpdateCourseOfferingRequest(data: UpdateCourseOfferingRequest): UpdateCourseOfferingRequest {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const courseId = data.courseId !== undefined ? validateCourseId(data.courseId) : undefined;

  const academicYear = data.academicYear !== undefined ? validateAcademicYear(data.academicYear) : undefined;

  const session = data.session !== undefined ? validateSession(data.session) : undefined;

  const startDate = data.startDate !== undefined ? validateDate(data.startDate, "start date") : undefined;

  const endDate = data.endDate !== undefined ? validateDate(data.endDate, "end date") : undefined;

  const status = data.status !== undefined ? validateCourseOfferingStatus(data.status) : undefined;

  validateDateRange(startDate, endDate);

  return {
    courseId,
    academicYear,
    session,
    startDate,
    endDate,
    status,
  };
}

export function validateCourseOfferingStatus(status: CourseOfferingStatus): CourseOfferingStatus {
  if (!COURSE_OFFERING_STATUSES.includes(status)) {
    throw new AppError("Invalid course offering status", 400);
  }

  return status;
}

export function validateAssignLecturerRequest(userId: number, role: CourseLecturerRole) {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new AppError("Invalid user id", 400);
  }

  if (!COURSE_LECTURER_ROLES.includes(role)) {
    throw new AppError("Invalid lecturer role", 400);
  }

  return {
    userId,
    role,
  };
}
