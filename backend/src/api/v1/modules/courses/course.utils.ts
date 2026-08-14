import { AppError } from "@/utils";

import { COURSE_LECTURER_ROLES, COURSE_SESSIONS } from "./course.constants";

import type { CourseLecturerRole, CreateCourseRequest, UpdateCourseRequest } from "./course.types";

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

  if (!COURSE_SESSIONS.includes(data.session)) {
    throw new AppError("Invalid course session", 400);
  }

  return {
    courseCode,
    courseName,
    description: data.description?.trim() || undefined,
    credits: data.credits,
    session: data.session,
  };
}

export const validateCreateCourseRequest = validateCourseRequest;
export const validateUpdateCourseRequest = validateCourseRequest;

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

export function validateCourseId(id: number): number {
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("Invalid course id", 400);
  }

  return id;
}
