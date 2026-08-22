import { AppError } from "@/utils";

import type { EnrolRequest } from "./enrolment.types";

export function validateCourseOfferingId(courseOfferingId: number): number {
  if (!Number.isInteger(courseOfferingId) || courseOfferingId <= 0) {
    throw new AppError("Invalid course offering id", 400);
  }

  return courseOfferingId;
}

export function validateEnrolRequest(data: EnrolRequest): EnrolRequest {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  if (!Number.isInteger(data.courseOfferingId) || data.courseOfferingId <= 0) {
    throw new AppError("Invalid course offering id", 400);
  }

  return {
    courseOfferingId: data.courseOfferingId,
  };
}
