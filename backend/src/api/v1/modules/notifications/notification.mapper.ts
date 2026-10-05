import type { Notification, DatabaseNotification } from "./notification.types";

export function toNotification(notification: DatabaseNotification): Notification {
  return {
    id: notification.id,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    priority: notification.priority,
    redirect_url: notification.redirect_url,
    reference_type: notification.reference_type,
    reference_id: notification.reference_id,
    is_read: notification.is_read,
    read_at: notification.read_at,
    created_at: notification.created_at,
  };
}
