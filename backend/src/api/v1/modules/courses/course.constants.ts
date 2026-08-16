export const COURSE_COLUMNS = `
  id,
  course_code,
  course_name,
  description,
  credits,
  session,
  is_active,
  created_at,
  updated_at
`;

export const COURSE_LECTURER_COLUMNS = `
  u.id,
  u.first_name,
  u.last_name,
  u.email,
  cl.role,
  cl.created_at
`;

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
