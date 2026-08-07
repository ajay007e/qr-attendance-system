import { Option } from "@/shared/components/ui/types";
import type { CourseSession, LecturerRole } from "./types";

export const COURSE_SESSION_OPTIONS = [
  {
    label: "Annual",
    value: "ANNUAL",
  },
  {
    label: "Spring",
    value: "SPRING",
  },
  {
    label: "Summer",
    value: "SUMMER",
  },
  {
    label: "Autumn",
    value: "AUTUMN",
  },
  {
    label: "Winter",
    value: "WINTER",
  },
  {
    label: "Trimester 1",
    value: "TRIMESTER_1",
  },
  {
    label: "Trimester 2",
    value: "TRIMESTER_2",
  },
  {
    label: "Trimester 3",
    value: "TRIMESTER_3",
  },
] satisfies {
  label: string;
  value: CourseSession;
}[];

export const COURSE_SESSION_FILTER_OPTIONS = [
  {
    label: "All Sessions",
    value: "ALL",
  },

  ...COURSE_SESSION_OPTIONS,
] satisfies readonly Option<CourseSession | "ALL">[];

export const DEFAULT_COURSE_QUERY = {
  page: 1,

  limit: 10,

  search: "",

  session: "ALL",

  status: "ALL",
} as const;

export const COURSE_STATUS_FILTER_OPTIONS = [
  {
    label: "All Status",
    value: "ALL",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
] satisfies readonly Option<"ALL" | "ACTIVE" | "INACTIVE">[];

export const UI_COURSE_SESSION_OPTIONS = COURSE_SESSION_FILTER_OPTIONS.filter(
  (item) => item.value !== "ALL",
);

export const LECTURER_ROLE_OPTIONS = [
  {
    label: "Primary",
    value: "PRIMARY",
  },
  {
    label: "Secondary",
    value: "SECONDARY",
  },
  {
    label: "Tutor",
    value: "TUTOR",
  },
] satisfies {
  label: string;
  value: LecturerRole;
}[];

export const COURSE_TABS = [
  {
    key: "details",
    label: "Details",
  },
  {
    key: "lecturers",
    label: "Lecturers",
  },
  {
    key: "status",
    label: "Status",
  },
] as const;
