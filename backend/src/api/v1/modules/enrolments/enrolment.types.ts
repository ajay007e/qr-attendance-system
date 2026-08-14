import type { PaginationQuery } from "@/types";

import type { Course, CourseLecturerRole, DatabaseCourse } from "../courses";
import type { DatabaseUser, PublicUser } from "../users";

export type EnrolledCourse = Pick<
  Course,
  "id" | "courseCode" | "courseName" | "description" | "credits" | "session" | "isActive"
> & {
  enrolledAt: Date;
};

export type DatabaseEnrolledCourse = Pick<
  DatabaseCourse,
  "id" | "course_code" | "course_name" | "description" | "credits" | "session" | "is_active"
> & {
  enrolled_at: Date;
};

export type AssignedCourse = Pick<
  Course,
  "id" | "courseCode" | "courseName" | "description" | "credits" | "session" | "isActive"
> & {
  lecturerRole: CourseLecturerRole;
  assignedAt: Date;
};

export type DatabaseAssignedCourse = Pick<
  DatabaseCourse,
  "id" | "course_code" | "course_name" | "description" | "credits" | "session" | "is_active"
> & {
  lecturer_role: CourseLecturerRole;
  assigned_at: Date;
};

export type Student = Pick<PublicUser, "id" | "firstName" | "lastName" | "email" | "role"> & {
  enrolledAt: Date;
};

export type DatabaseStudent = Pick<DatabaseUser, "id" | "first_name" | "last_name" | "email" | "role"> & {
  enrolled_at: Date;
};

export interface EnrolRequest {
  courseId: number;
}

export interface EnrolmentQuery extends PaginationQuery {
  search?: string;
}
