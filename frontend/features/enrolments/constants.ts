import { COURSE_SESSION_OPTIONS } from "@/features/courses/constants";

export const COURSE_SESSION_LABELS = Object.fromEntries(
  COURSE_SESSION_OPTIONS.map((option) => [option.value, option.label]),
);

export const COURSE_SEARCH_LIMIT = 10;
export const COURSE_SEARCH_MIN_LENGTH = 2;

export const COURSE_CARD_GRADIENTS = [
  "from-blue-200 via-indigo-200 to-slate-100",
  "from-cyan-200 via-sky-200 to-slate-100",
  "from-violet-200 via-purple-200 to-slate-100",
  "from-emerald-200 via-teal-200 to-slate-100",
  "from-amber-200 via-orange-200 to-slate-100",
  "from-rose-200 via-pink-200 to-slate-100",
  "from-indigo-200 via-blue-200 to-slate-100",
  "from-teal-200 via-emerald-200 to-slate-100",
] as const;
