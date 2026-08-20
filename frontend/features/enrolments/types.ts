import type { Course, CourseOfferingStatus, CourseSession, LecturerRole, PaginationQuery } from "@/shared";

export interface StudentCourse extends Course {
  courseOfferingId: number;

  academicYear: number;
  session: CourseSession;
  offering_status: CourseOfferingStatus;

  enrolment_status: EnrolmentStatus;
  enrolled_at: string | null;
}

export type EnrolmentStatus = "enrolled" | "withdrawn" | "completed" | "unsuccessful";

export interface AssignedCourse extends Course {
  courseOfferingId: number;

  academicYear: number;
  session: CourseSession;
  offeringStatus: CourseOfferingStatus;

  lecturer_role: LecturerRole;
  assigned_at: string;
}

export interface EnrolRequest {
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
