export const ATTENDANCE_SESSION_STATUSES = ["ACTIVE", "ENDED", "EXPIRED"] as const;

export const ATTENDANCE_SESSION_COLUMNS = `
  id,
  course_id,
  lecturer_id,
  status,
  session_date,
  start_time,
  end_time,
  duration_minutes,
  created_at,
  updated_at
`;

export const DEFAULT_SESSION_DURATION_MINUTES = 15;
export const MAX_SESSION_DURATION_MINUTES = 180;