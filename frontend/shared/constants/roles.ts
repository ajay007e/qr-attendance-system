import { Option } from "../components";
import { CourseOfferingStatus, CourseSession } from "../types";

export const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  LECTURER: "lecturer",
  STUDENT: "student",
} as const;

export const COURSE_SESSION = {
  ANNUAL: "annual",
  SPRING: "spring",
  SUMMER: "summer",
  AUTUMN: "autumn",
  WINTER: "winter",
  TRIMESTER_1: "trimester_1",
  TRIMESTER_2: "trimester_2",
  TRIMESTER_3: "trimester_3",
} as const satisfies Record<string, CourseSession>;

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

export const COURSE_OFFERING_STATUS_LABELS: Record<CourseOfferingStatus, string> = {
  enrol: "Enrol",
  started: "Started",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function getOfferingStatusLabel(status: CourseOfferingStatus): string {
  return COURSE_OFFERING_STATUS_LABELS[status];
}
