import type { LecturerRole, Option } from "@/shared";

export const COURSE_STATUS_FILTER_OPTIONS = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
] satisfies readonly Option<"ALL" | "ACTIVE" | "INACTIVE">[];
export const DEFAULT_COURSE_QUERY = {
  page: 1,
  limit: 10,
  search: "",
  session: "ALL",
  status: "ALL",
} as const;

export const LECTURER_ROLE = {
  PRIMARY: "PRIMARY",
  SECONDARY: "SECONDARY",
  TUTOR: "TUTOR",
} as const satisfies Record<LecturerRole, LecturerRole>;

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
  { key: "lecturers", label: "Lecturers" },
  { key: "status", label: "Status" },
] as const;
