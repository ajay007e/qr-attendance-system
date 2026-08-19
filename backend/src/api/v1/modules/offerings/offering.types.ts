import type { PaginationQuery } from "@/types";

import type { DatabaseUser, PublicUser } from "../users";

import { COURSE_LECTURER_ROLES, COURSE_OFFERING_STATUSES, COURSE_SESSIONS } from "./offering.constants";

export type CourseSession = (typeof COURSE_SESSIONS)[number];

export type CourseLecturerRole = (typeof COURSE_LECTURER_ROLES)[number];

export type CourseOfferingStatus = (typeof COURSE_OFFERING_STATUSES)[number];

// ==========================================
// Course Offering
// ==========================================

export interface CourseOffering {
  id: number;
  courseId: number;

  academicYear: number;
  session: CourseSession;

  startDate: Date | null;
  endDate: Date | null;

  status: CourseOfferingStatus;

  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// Database Course Offering
// ==========================================

export type DatabaseCourseOffering = Omit<
  CourseOffering,
  "courseId" | "academicYear" | "startDate" | "endDate" | "createdAt" | "updatedAt"
> & {
  course_id: number;

  academic_year: number;
  start_date: Date | null;
  end_date: Date | null;

  created_at: Date;
  updated_at: Date;
};

// ==========================================
// Course Offering List
// ==========================================

export interface CourseOfferingListItem {
  id: number;

  courseId: number;
  courseCode: string;
  courseName: string;

  academicYear: number;
  session: CourseSession;

  startDate: Date | null;
  endDate: Date | null;

  status: CourseOfferingStatus;

  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseCourseOfferingListItem {
  id: number;

  course_id: number;
  course_code: string;
  course_name: string;

  academic_year: number;
  session: CourseSession;

  start_date: Date | null;
  end_date: Date | null;

  status: CourseOfferingStatus;

  created_at: Date;
  updated_at: Date;
}

// ==========================================
// Create / Update
// ==========================================

export interface CreateCourseOfferingRequest {
  courseId: number;
  academicYear: number;
  session: CourseSession;

  startDate?: string;
  endDate?: string;
}

export interface UpdateCourseOfferingRequest {
  courseId?: number;
  academicYear?: number;
  session?: CourseSession;
  startDate?: string | null;
  endDate?: string | null;
}

export type CreateCourseOfferingData = Pick<
  DatabaseCourseOffering,
  "course_id" | "academic_year" | "session" | "start_date" | "end_date"
>;

export type UpdateCourseOfferingData = Partial<CreateCourseOfferingData>;

// ==========================================
// Query
// ==========================================

export interface CourseOfferingQuery extends PaginationQuery {
  search?: string;
  session?: CourseSession;
  status?: CourseOfferingStatus;
}

// ==========================================
// Lecturers
// ==========================================

export type Lecturer = Pick<PublicUser, "id" | "firstName" | "lastName" | "email"> & {
  role: CourseLecturerRole;
};

export type DatabaseLecturer = Pick<DatabaseUser, "id" | "first_name" | "last_name" | "email"> & {
  role: CourseLecturerRole;
};

export interface AssignLecturerRequest {
  id: number;
  role: CourseLecturerRole;
}
