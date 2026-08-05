import { CourseQuery } from "./types";

export const COURSE_SESSIONS = [
  "ANNUAL",
  "SPRING",
  "SUMMER",
  "AUTUMN",
  "WINTER",
  "TRIMESTER_1",
  "TRIMESTER_2",
  "TRIMESTER_3",
] as const;

export const DEFAULT_COURSE_QUERY: CourseQuery = {
  page: 1,
  limit: 10,
  search: "",
  session: "ALL",
  status: "ALL",
};

export const COURSE_SESSION_FILTER_OPTIONS = [
  {
    label: "All Sessions",
    value: "ALL",
  },
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
];

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
];

export const UI_COURSE_SESSION_OPTIONS = COURSE_SESSION_FILTER_OPTIONS.filter(
  (item) => item.value !== "ALL",
);
