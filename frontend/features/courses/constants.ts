import type { CourseOfferingQuery, CourseQuery, CreateCourseRequest } from "@/features/courses";
import type { Option, StatusFilter } from "@/shared";

export const COURSE_STATUS_FILTER_OPTIONS = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
] satisfies readonly Option<StatusFilter>[];

export const DEFAULT_COURSE_QUERY: CourseQuery = {
  page: 1,
  limit: 10,
  search: "",
  status: "ALL",
};

export const INITIAL_FORM: CreateCourseRequest = {
  courseCode: "",
  courseName: "",
  description: "",
  credits: 0,
};

export const INITIAL_QUERY: CourseOfferingQuery = {
  search: "",
  session: "ALL",
  status: "ALL",
  page: 1,
  limit: 10,
};
export const COURSE_TABS = [
  { key: "details", label: "Details" },
  { key: "status", label: "Status" },
] as const;

export const COURSE_OFFERING_STATUS_OPTIONS = [
  { label: "Enrol", value: "enrol" },
  { label: "Started", value: "started" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
] as const;

export const COURSE_OFFERING_STATUS_FILTER_OPTIONS = [
  { label: "All Statuses", value: "ALL" },
  ...COURSE_OFFERING_STATUS_OPTIONS,
] as const;

export const DEFAULT_OFFERING_QUERY: CourseOfferingQuery = {
  search: "",
  session: "ALL",
  status: "ALL",
  page: 1,
  limit: 10,
};

export const OFFERING_TABS = [
  { key: "details", label: "Details" },
  { key: "lecturers", label: "Lecturers" },
  { key: "status", label: "Status" },
] as const;
