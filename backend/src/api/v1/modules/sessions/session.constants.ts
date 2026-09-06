export const ATTENDANCE_SESSION_STATUSES = ["open", "closed", "expired"] as const;

export const CLASS_TYPES = ["lecture", "laboratory", "tutorial", "workshop", "seminar", "other"] as const;

export const ATTENDANCE_SESSION_COLUMNS = `
  id,
  title,
  course_offering_id,
  lecturer_id,
  week_number,
  class_number,
  class_type,
  session_start_at,
  session_end_at,
  latitude,
  longitude,
  session_status,
  created_at,
  updated_at
`;

export const ACTIVE_SESSION_CONDITION = `
  (
    session_status = 'open'
    OR (session_status = 'closed' AND session_end_at > NOW())
  )
`;

export const QR_TOKEN_EXPIRATION_SECONDS = 15;
