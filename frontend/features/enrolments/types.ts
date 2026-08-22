import type { Course, CourseOfferingStatus, CourseSession, LecturerRole, PaginationQuery } from "@/shared";

export interface CourseOfferingContext {
  courseOfferingId: number;
  academicYear: number;
  session: CourseSession;
}

export type EnrolmentStatus = "enrolled" | "withdrawn" | "completed" | "unsuccessful";

export interface StudentCourse extends Course, CourseOfferingContext {
  offeringStatus: CourseOfferingStatus;
  enrolmentStatus: EnrolmentStatus;
  enrolledAt: string | null;
}

export interface AssignedCourse extends Course, CourseOfferingContext {
  offeringStatus: CourseOfferingStatus;
  lecturerRole: LecturerRole;
  assignedAt: string;
}

export interface EnrolCourseRequest {
  courseOfferingId: number;
}

export interface CourseSearchProps {
  value: string;
  courses: StudentCourse[];
  loading?: boolean;
  onChange: (value: string) => void;
  onSelect: (course: StudentCourse) => void;
}

export interface ParticipantQuery extends PaginationQuery {
  search: string;
}
