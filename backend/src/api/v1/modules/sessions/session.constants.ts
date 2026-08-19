export const ATTENDANCE_SESSION_STATUSES = ["OPEN", "CLOSED", "EXPIRED"] as const;

export const CLASS_TYPES = ["LECTURE", "LABORATORY", "TUTORIAL", "WORKSHOP", "SEMINAR", "OTHER"] as const;

export const ATTENDANCE_SESSION_COLUMNS = `
  id,
  course_offering_id,
  lecturer_id,
  week_number,
  class_type,
  session_start_at,
  session_end_at,
  latitude,
  longitude,
  attendance_status,
  created_at,
  updated_at
`;

export const ACTIVE_SESSION_CONDITION = `
  (
    attendance_status = 'OPEN'
    OR (attendance_status = 'CLOSED' AND session_end_at > NOW())
  )
`;
