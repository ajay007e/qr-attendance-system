import type { PaginationQuery } from "@/types";

import { COURSE_LECTURER_ROLES, COURSE_SESSIONS } from "./course.constants";
import type { DatabaseUser, PublicUser } from "../users";

export type CourseSession = (typeof COURSE_SESSIONS)[number];

export type CourseLecturerRole = (typeof COURSE_LECTURER_ROLES)[number];

export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  session: CourseSession;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DatabaseCourse = Omit<Course, "courseCode" | "courseName" | "isActive" | "createdAt" | "updatedAt"> & {
  course_code: string;
  course_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export type PublicCourse = Omit<Course, "createdAt" | "updatedAt">;

export type Lecturer = Pick<PublicUser, "id" | "firstName" | "lastName" | "email"> & {
  role: CourseLecturerRole;
};

export type DatabaseLecturer = Pick<DatabaseUser, "id" | "first_name" | "last_name" | "email"> & {
  role: CourseLecturerRole;
};

export type CreateCourseRequest = Pick<Course, "courseCode" | "courseName" | "credits" | "session"> & {
  description?: string;
};

export type CreateCourseData = Pick<
  DatabaseCourse,
  "course_code" | "course_name" | "description" | "credits" | "session"
>;

export type UpdateCourseRequest = CreateCourseRequest;

export type UpdateCourseData = CreateCourseData;

export interface UpdateCourseStatusRequest {
  isActive: boolean;
}

export interface AssignLecturerRequest {
  id: number;
  role: CourseLecturerRole;
}

export interface CourseQuery extends PaginationQuery {
  search?: string;
  session?: CourseSession;
  status?: "ACTIVE" | "INACTIVE";
}

export interface ParticipantQuery extends PaginationQuery {
  search?: string;
}
