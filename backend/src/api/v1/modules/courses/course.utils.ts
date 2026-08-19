import { AppError } from "@/utils";

import type { CreateCourseRequest, UpdateCourseRequest } from "./course.types";

export function validateCourseRequest(data: CreateCourseRequest | UpdateCourseRequest): CreateCourseRequest {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const courseCode = data.courseCode?.trim().toUpperCase();
  const courseName = data.courseName?.trim();

  if (!courseCode) {
    throw new AppError("Course code is required", 400);
  }

  if (!courseName) {
    throw new AppError("Course name is required", 400);
  }

  if (typeof data.credits !== "number" || !Number.isInteger(data.credits) || data.credits <= 0) {
    throw new AppError("Credits must be a positive integer", 400);
  }

  return {
    courseCode,
    courseName,
    description: data.description?.trim() || undefined,
    credits: data.credits,
  };
}

export const validateCreateCourseRequest = validateCourseRequest;
export const validateUpdateCourseRequest = validateCourseRequest;

export function validateCourseId(id: number): number {
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Invalid course id", 400);
  }

  return id;
}
