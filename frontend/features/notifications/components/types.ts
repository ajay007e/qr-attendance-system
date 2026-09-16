import type { Notification } from "../types";

export type NotificationPanelProps = {
  onClose: () => void;
};

export type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};
