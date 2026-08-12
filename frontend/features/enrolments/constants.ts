import { COURSE_SESSION_OPTIONS } from "@/features/courses/constants";

export const COURSE_SESSION_LABELS = Object.fromEntries(
  COURSE_SESSION_OPTIONS.map((option) => [option.value, option.label]),
);

export const COURSE_SEARCH_LIMIT = 10;
export const COURSE_SEARCH_MIN_LENGTH = 2;
