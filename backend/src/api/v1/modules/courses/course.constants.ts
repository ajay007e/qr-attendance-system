export const COURSE_COLUMNS = `
  id,
  course_code,
  course_name,
  description,
  credits,
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
