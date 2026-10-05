import type { ApiResponse, CursorPaginatedData } from "@/shared";

export type NotificationType = "payment" | "academic" | "announcement" | string;
export type NotificationPriority = "low" | "medium" | "high";

export type Notification = {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  redirect_url: string | null;
  reference_type: string | null;
  reference_id: number | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
};

export type NotificationReadFilter = "all" | "unread" | "read";

export type GetNotificationsParams = {
  limit?: number;
  cursor?: string | null;
  isRead?: boolean | null;
};

export type NotificationsPage = CursorPaginatedData<Notification>;
export type GetNotificationsResponse = ApiResponse<NotificationsPage>;
export type MarkNotificationReadResponse = ApiResponse<Notification>;
