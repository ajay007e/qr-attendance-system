import type { LecturerRole } from "./types";
import type { CourseSession, Option } from "@/shared";

export const COURSE_SESSION = {
  ANNUAL: "ANNUAL",
  SPRING: "SPRING",
  SUMMER: "SUMMER",
  AUTUMN: "AUTUMN",
  WINTER: "WINTER",
  TRIMESTER_1: "TRIMESTER_1",
  TRIMESTER_2: "TRIMESTER_2",
  TRIMESTER_3: "TRIMESTER_3",
} as const satisfies Record<CourseSession, CourseSession>;

export const COURSE_SESSION_LABELS: Record<CourseSession, string> = {
  [COURSE_SESSION.ANNUAL]: "Annual",
  [COURSE_SESSION.SPRING]: "Spring",
  [COURSE_SESSION.SUMMER]: "Summer",
  [COURSE_SESSION.AUTUMN]: "Autumn",
  [COURSE_SESSION.WINTER]: "Winter",
  [COURSE_SESSION.TRIMESTER_1]: "Trimester 1",
  [COURSE_SESSION.TRIMESTER_2]: "Trimester 2",
  [COURSE_SESSION.TRIMESTER_3]: "Trimester 3",
};

export const COURSE_SESSION_OPTIONS = [
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.ANNUAL],
    value: COURSE_SESSION.ANNUAL,
  },
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.SPRING],
    value: COURSE_SESSION.SPRING,
  },
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.SUMMER],
    value: COURSE_SESSION.SUMMER,
  },
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.AUTUMN],
    value: COURSE_SESSION.AUTUMN,
  },
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.WINTER],
    value: COURSE_SESSION.WINTER,
  },
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.TRIMESTER_1],
    value: COURSE_SESSION.TRIMESTER_1,
  },
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.TRIMESTER_2],
    value: COURSE_SESSION.TRIMESTER_2,
  },
  {
    label: COURSE_SESSION_LABELS[COURSE_SESSION.TRIMESTER_3],
    value: COURSE_SESSION.TRIMESTER_3,
  },
] satisfies readonly Option<CourseSession>[];

export const getSessionLabel = (value: CourseSession): string => COURSE_SESSION_LABELS[value];

export const COURSE_SESSION_FILTER_OPTIONS = [
  { label: "All Sessions", value: "ALL" },
  ...COURSE_SESSION_OPTIONS,
] satisfies readonly Option<CourseSession | "ALL">[];

export const UI_COURSE_SESSION_OPTIONS = COURSE_SESSION_FILTER_OPTIONS.filter((option) => option.value !== "ALL");

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
