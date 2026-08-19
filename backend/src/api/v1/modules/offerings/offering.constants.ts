export const COURSE_SESSIONS = [
  "annual",
  "spring",
  "summer",
  "autumn",
  "winter",
  "trimester_1",
  "trimester_2",
  "trimester_3",
] as const;

export const COURSE_LECTURER_ROLES = ["primary", "secondary", "tutor"] as const;

export const COURSE_OFFERING_STATUSES = ["enrol", "started", "completed", "cancelled"] as const;
export const COURSE_LECTURER_COLUMNS = `
  u.id,
  u.first_name,
  u.last_name,
  u.email,
  cl.role
`;
