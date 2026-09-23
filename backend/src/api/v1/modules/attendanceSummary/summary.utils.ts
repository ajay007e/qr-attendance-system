import { AppError } from "@/utils";

export function validateCourseOfferingId(courseOfferingId: number): number {
  if (!Number.isInteger(courseOfferingId) || courseOfferingId <= 0) {
    throw new AppError("Invalid course offering id", 400);
  }

  return courseOfferingId;
}