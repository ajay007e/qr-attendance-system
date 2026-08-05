import { AppError } from "../../../../utils/app.error";

import {
  CourseSession,
  CourseLecturerRole,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "./course.types";

const VALID_SESSIONS: CourseSession[] = [
  "ANNUAL",
  "SPRING",
  "WINTER",
  "AUTUMN",
  "SUMMER",
  "TRIMESTER_1",
  "TRIMESTER_2",
  "TRIMESTER_3",
];

const VALID_LECTURER_ROLES: CourseLecturerRole[] = [
  "PRIMARY",
  "SECONDARY",
  "TUTOR",
];

export function validateCreateCourseRequest(data: CreateCourseRequest) {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const courseCode = data.course_code?.trim().toUpperCase();

  const courseName = data.course_name?.trim();

  if (!courseCode) {
    throw new AppError("Course code is required", 400);
  }

  if (!courseName) {
    throw new AppError("Course name is required", 400);
  }

  if (!data.credits || data.credits <= 0) {
    throw new AppError("Credits must be greater than zero", 400);
  }

  if (!VALID_SESSIONS.includes(data.session)) {
    throw new AppError("Invalid course session", 400);
  }

  return {
    ...data,
    course_code: courseCode,
    course_name: courseName,
  };
}

export function validateUpdateCourseRequest(data: UpdateCourseRequest) {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  if (data.session && !VALID_SESSIONS.includes(data.session)) {
    throw new AppError("Invalid course session", 400);
  }

  if (data.credits !== undefined && data.credits <= 0) {
    throw new AppError("Credits must be greater than zero", 400);
  }

  return {
    ...data,

    ...(data.course_code && {
      course_code: data.course_code.trim().toUpperCase(),
    }),

    ...(data.course_name && {
      course_name: data.course_name.trim(),
    }),
  };
}

export function validateAssignLecturerRequest(
  userId: number,
  role: CourseLecturerRole,
) {
  if (!userId || userId <= 0) {
    throw new AppError("Invalid user id", 400);
  }

  if (!VALID_LECTURER_ROLES.includes(role)) {
    throw new AppError("Invalid lecturer role", 400);
  }

  return {
    userId,
    role,
  };
}
