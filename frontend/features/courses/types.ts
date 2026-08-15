import type { User, Course, CourseSession, PaginationQuery } from "@/shared";

export type Lecturer = Pick<User, "id" | "firstName" | "lastName" | "email"> & { role?: LecturerRole };

export type CreateCourseRequest = Pick<Course, "courseName" | "courseCode" | "description" | "credits" | "session">;

export type UpdateCourseRequest = CreateCourseRequest;

export type UpdateCourseStatusRequest = Pick<Course, "isActive">;

export type AssignLecturerRequest = Pick<Lecturer, "role" | "id">;

export interface CourseQuery extends PaginationQuery {
  search: string;
  session: CourseSession | "ALL";
  status: "ALL" | "ACTIVE" | "INACTIVE";
}

export type LecturerRole = "PRIMARY" | "SECONDARY" | "TUTOR";
