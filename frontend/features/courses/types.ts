import type {
  Course,
  CourseOffering,
  CourseOfferingStatus,
  CourseSession,
  Lecturer,
  PaginationQuery,
  StatusFilter,
  WithAll,
} from "@/shared";

export type CreateCourseRequest = Pick<Course, "courseName" | "courseCode" | "description" | "credits">;

export type UpdateCourseRequest = CreateCourseRequest;

export interface CourseQuery extends PaginationQuery {
  search: string;
  status: StatusFilter;
}

export type CreateCourseOfferingRequest = Pick<
  CourseOffering,
  "courseId" | "academicYear" | "session" | "startDate" | "endDate"
>;

export type UpdateCourseOfferingRequest = Partial<CreateCourseOfferingRequest> & {
  status?: CourseOfferingStatus;
};

export interface CourseOfferingQuery extends PaginationQuery {
  search: string;
  session: WithAll<CourseSession>;
  status: WithAll<CourseOfferingStatus>;
}

export type AssignOfferingLecturerRequest = Pick<Lecturer, "role" | "id">;
