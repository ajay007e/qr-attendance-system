export const NOTIFICATION_TYPES = {
  LOW_ATTENDANCE: "low_attendance",
  ATTENDANCE_SESSION_STARTED: "attendance_session_started",
  ATTENDANCE_SESSION_CLOSED: "attendance_session_closed",
} as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

export const NOTIFICATION_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type NotificationPriority = (typeof NOTIFICATION_PRIORITIES)[keyof typeof NOTIFICATION_PRIORITIES];

export const NOTIFICATION_REFERENCE_TYPES = {
  ATTENDANCE: "attendance",
} as const;

export const DEFAULT_NOTIFICATIONS_LIMIT = 20;
export const MAX_NOTIFICATIONS_LIMIT = 50;

export const NOTIFICATION_COLUMNS = `
  id,
  title,
  message,
  type,
  priority,
  redirect_url,
  reference_type,
  reference_id,
  is_read,
  read_at,
  created_at
`;
