import type {
  Course,
  CourseOffering,
  CourseOfferingStatus,
  CourseSession,
  Lecturer,
  PaginationQuery,
  StatusFilter,
} from "@/shared";

// ==========================================
// Course
// ==========================================

export type CreateCourseRequest = Pick<Course, "courseName" | "courseCode" | "description" | "credits">;

export type UpdateCourseRequest = CreateCourseRequest;

export interface CourseQuery extends PaginationQuery {
  search: string;
  status: StatusFilter;
}

// ==========================================
// Course Offering
// ==========================================

export type CreateCourseOfferingRequest = Pick<
  CourseOffering,
  "courseId" | "academicYear" | "session" | "startDate" | "endDate"
>;

export type UpdateCourseOfferingRequest = Partial<CreateCourseOfferingRequest> & {
  status?: CourseOfferingStatus;
};

export interface CourseOfferingQuery extends PaginationQuery {
  search: string;
  session: CourseSession | "ALL";
  status: CourseOfferingStatus | "ALL";
}

export type AssignOfferingLecturerRequest = Pick<Lecturer, "role" | "id">;
