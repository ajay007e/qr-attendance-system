import type { NotificationPriority, NotificationType } from "./notification.constants";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  redirect_url: string | null;
  reference_type: string | null;
  reference_id: number | null;
  is_read: boolean;
  read_at: Date | null;
  created_at: Date;
}

export type DatabaseNotification = Notification;

export interface NotificationQuery {
  userId: number;
  limit?: number;
  cursor?: string | null;
  isRead?: boolean | null;
}

export interface NotificationCreateData {
  userId: number;
  type: NotificationType;
  referenceType?: string | null;
  referenceId?: number | null;
}

export interface CreateNotificationData {
  user_id: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  redirect_url?: string | null;
  reference_type?: string | null;
  reference_id?: number | null;
}
