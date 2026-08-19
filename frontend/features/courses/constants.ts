import type { LecturerRole, Option } from "@/shared";
import type { CourseOfferingQuery } from "./types";

export const COURSE_STATUS_FILTER_OPTIONS = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
] satisfies readonly Option<"ALL" | "ACTIVE" | "INACTIVE">[];
export const DEFAULT_COURSE_QUERY = {
  page: 1,
  limit: 10,
  search: "",
  status: "ALL",
} as const;

export const LECTURER_ROLE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TUTOR: "tutor",
} as const satisfies Record<string, LecturerRole>;

export const LECTURER_ROLE_LABELS: Record<LecturerRole, string> = {
  [LECTURER_ROLE.PRIMARY]: "Primary",
  [LECTURER_ROLE.SECONDARY]: "Secondary",
  [LECTURER_ROLE.TUTOR]: "Tutor",
};

export const LECTURER_ROLE_OPTIONS = [
  {
    label: LECTURER_ROLE_LABELS[LECTURER_ROLE.PRIMARY],
    value: LECTURER_ROLE.PRIMARY,
  },
  {
    label: LECTURER_ROLE_LABELS[LECTURER_ROLE.SECONDARY],
    value: LECTURER_ROLE.SECONDARY,
  },
  {
    label: LECTURER_ROLE_LABELS[LECTURER_ROLE.TUTOR],
    value: LECTURER_ROLE.TUTOR,
  },
] satisfies readonly Option<LecturerRole>[];

export const getLecturerRoleLabel = (value: LecturerRole): string => LECTURER_ROLE_LABELS[value];

export const COURSE_TABS = [
  { key: "details", label: "Details" },
  { key: "status", label: "Status" },
] as const;
export const COURSE_OFFERING_STATUSES = ["enrol", "started", "completed", "cancelled"] as const;

export const COURSE_OFFERING_STATUS_OPTIONS = [
  {
    label: "Enrol",
    value: "enrol",
  },
  {
    label: "Started",
    value: "started",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
] as const;

export const DEFAULT_OFFERING_QUERY: CourseOfferingQuery = {
  search: "",
  session: "ALL",
  status: "ALL",
  page: 1,
  limit: 10,
};
export const OFFERING_TABS = [
  {
    key: "details",
    label: "Details",
    value: "details",
  },
  {
    key: "lecturers",
    label: "Lecturers",
    value: "lecturers",
  },
  {
    key: "status",
    label: "Status",
    value: "status",
  },
] as const;

export const COURSE_LECTURER_ROLES = ["primary", "secondary", "tutor"] as const;
export const COURSE_OFFERING_STATUS_FILTER_OPTIONS = [
  {
    label: "All Statuses",
    value: "ALL",
  },
  ...COURSE_OFFERING_STATUS_OPTIONS,
] as const;
