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

export const COURSE_LECTURER_ROLES = ["PRIMARY", "SECONDARY", "TUTOR"] as const;

export const COURSE_OFFERING_STATUSES = ["ENROL", "STARTED", "COMPLETED", "CANCELLED"] as const;

export const COURSE_LECTURER_COLUMNS = `
  u.id,
  u.first_name,
  u.last_name,
  u.email,
  cl.role
`;
