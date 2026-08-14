import { AppError } from "../../../../utils/app.error";
import { CourseLecturerRole } from "../courses/course.types";

import { EnrolRequest, Pagination } from "./enrolment.types";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

const VALID_LECTURER_ROLES: CourseLecturerRole[] = ["PRIMARY", "SECONDARY", "TUTOR"];

export function validateCourseId(courseId: number): number {
  if (!Number.isInteger(courseId) || courseId <= 0) {
    throw new AppError("Invalid course id", 400);
  }

  return courseId;
}

export function validateEnrolRequest(data: EnrolRequest): EnrolRequest {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const courseId = Number(data.courseId);

  if (!Number.isInteger(courseId) || courseId <= 0) {
    throw new AppError("Invalid course id", 400);
  }

  return {
    courseId,
  };
}

export function validatePagination(limit?: unknown, page?: unknown, search?: unknown): Pagination {
  const rawLimit = Number(limit);
  const rawPage = Number(page);

  const normalizedLimit =
    Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(Math.floor(rawLimit), MAX_LIMIT) : DEFAULT_LIMIT;

  const normalizedPage = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;

  return {
    page: normalizedPage,
    limit: normalizedLimit,
    search: search?.trim() ?? "",
  };
}

export function validateLecturerRole(role: CourseLecturerRole): CourseLecturerRole {
  if (!VALID_LECTURER_ROLES.includes(role)) {
    throw new AppError("Invalid lecturer role", 400);
  }

  return role;
}
