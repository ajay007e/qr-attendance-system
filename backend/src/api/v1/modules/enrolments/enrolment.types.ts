import type { PaginationQuery } from "@/types";

import type { CourseLecturerRole, CourseOfferingStatus, CourseSession } from "../offerings";

import type { DatabaseUser, PublicUser } from "../users";

// ==========================================
// Enrolment Status
// ==========================================

export const ENROLMENT_STATUSES = ["enrolled", "withdrawn", "completed", "unsuccessful"] as const;

export type EnrolmentStatus = (typeof ENROLMENT_STATUSES)[number];

// ==========================================
// Enrolled Course Offering
// ==========================================

export interface EnrolledCourse {
  courseOfferingId: number;

  courseId: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  isActive: boolean;

  academicYear: number;
  session: CourseSession;

  offeringStatus: CourseOfferingStatus;
  enrolmentStatus: EnrolmentStatus;

  enrolledAt: Date;
}

export interface DatabaseEnrolledCourse {
  course_offering_id: number;

  course_id: number;
  course_code: string;
  course_name: string;
  description: string | null;
  credits: number;
  is_active: boolean;

  academic_year: number;
  session: CourseSession;

  offering_status: CourseOfferingStatus;
  enrolment_status: EnrolmentStatus;

  enrolled_at: Date;
}

// ==========================================
// Assigned Course Offering
// ==========================================

export interface AssignedCourse {
  courseOfferingId: number;

  courseId: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  isActive: boolean;

  academicYear: number;
  session: CourseSession;

  offeringStatus: CourseOfferingStatus;

  lecturerRole: CourseLecturerRole;
  assignedAt: Date;
}

export interface DatabaseAssignedCourse {
  course_offering_id: number;

  course_id: number;
  course_code: string;
  course_name: string;
  description: string | null;
  credits: number;
  is_active: boolean;

  academic_year: number;
  session: CourseSession;

  offering_status: CourseOfferingStatus;

  lecturer_role: CourseLecturerRole;
  assigned_at: Date;
}

// ==========================================
// Student
// ==========================================

export type Student = Pick<PublicUser, "id" | "firstName" | "lastName" | "email" | "role"> & {
  enrolledAt: Date;
  enrolmentStatus: EnrolmentStatus;
};

export type DatabaseStudent = Pick<DatabaseUser, "id" | "first_name" | "last_name" | "email" | "role"> & {
  enrolled_at: Date;
  enrolment_status: EnrolmentStatus;
};

// ==========================================
// Enrolment Request
// ==========================================

export interface EnrolRequest {
  courseOfferingId: number;
}

// ==========================================
// Enrolment Query
// ==========================================

export interface EnrolmentQuery extends PaginationQuery {
  search?: string;
}
