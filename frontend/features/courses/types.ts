import type { Course, CourseOffering, CourseOfferingStatus, CourseSession, Lecturer, PaginationQuery } from "@/shared";

// ==========================================
// Course
// ==========================================

export type CreateCourseRequest = Pick<Course, "courseName" | "courseCode" | "description" | "credits">;

export type UpdateCourseRequest = CreateCourseRequest;

export type UpdateCourseStatusRequest = Pick<Course, "isActive">;

export type AssignLecturerRequest = Pick<Lecturer, "role" | "id">;

export interface CourseQuery extends PaginationQuery {
  search: string;
  status: "ALL" | "ACTIVE" | "INACTIVE";
}

export interface LecturerSearchProps {
  query: string;
  results: Lecturer[];
  loading: boolean;
  selectedLecturer: Lecturer | null;
  onQueryChange: (value: string) => void;
  onSelect: (lecturer: Lecturer | null) => void;
  onClear: () => void;
  onFocus: () => void;
  open: boolean;
}

// ==========================================
// Course Offering
// ==========================================

export type CourseOfferingListItem = CourseOffering;

export interface CreateCourseOfferingRequest {
  courseId: number;
  academicYear: number;
  session: CourseSession;
  startDate?: string;
  endDate?: string;
}

export type UpdateCourseOfferingRequest = Partial<Omit<CreateCourseOfferingRequest, "courseId">> & {
  courseId?: number;
  status?: CourseOfferingStatus;
};

export interface CourseOfferingQuery extends PaginationQuery {
  search: string;
  session: CourseSession | "ALL";
  status: CourseOfferingStatus | "ALL";
}

export type AssignOfferingLecturerRequest = Pick<Lecturer, "role" | "id">;

export type OfferingEditTab = "details" | "lecturers" | "status";
