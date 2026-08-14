import { AppError } from "@/utils";

import type { EnrolRequest } from "./enrolment.types";

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

  if (!Number.isInteger(data.courseId) || data.courseId <= 0) {
    throw new AppError("Invalid course id", 400);
  }

  return {
    courseId: data.courseId,
  };
}
