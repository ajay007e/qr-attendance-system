import { AppError } from "@/utils";

import { NOTIFICATION_PRIORITIES, NOTIFICATION_TYPES } from "./notification.constants";
import { toNotification } from "./notification.mapper";
import { NotificationRepository } from "./notification.repository";
import type {
  CreateNotificationData,
  Notification,
  NotificationCreateData,
  NotificationQuery,
} from "./notification.types";

function buildNotification(data: NotificationCreateData): CreateNotificationData {
  switch (data.type) {
    case NOTIFICATION_TYPES.LOW_ATTENDANCE:
      return {
        user_id: data.userId,
        title: "Low attendance",
        message: "Your attendance percentage has fallen below the required threshold.",
        type: data.type,
        priority: NOTIFICATION_PRIORITIES.HIGH,
        redirect_url: null,
        reference_type: data.referenceType ?? "attendance",
        reference_id: data.referenceId ?? null,
      };

    case NOTIFICATION_TYPES.ATTENDANCE_SESSION_STARTED:
      return {
        user_id: data.userId,
        title: "Attendance session started",
        message: "An attendance session has started.",
        type: data.type,
        priority: NOTIFICATION_PRIORITIES.MEDIUM,
        redirect_url: null,
        reference_type: data.referenceType ?? "attendance",
        reference_id: data.referenceId ?? null,
      };

    case NOTIFICATION_TYPES.ATTENDANCE_SESSION_CLOSED:
      return {
        user_id: data.userId,
        title: "Attendance session closed",
        message: "An attendance session has been closed.",
        type: data.type,
        priority: NOTIFICATION_PRIORITIES.MEDIUM,
        redirect_url: null,
        reference_type: data.referenceType ?? "attendance",
        reference_id: data.referenceId ?? null,
      };

    default:
      throw new AppError("Unsupported notification type", 400);
  }
}

export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  async create(data: NotificationCreateData): Promise<Notification> {
    if (!Number.isInteger(data.userId) || data.userId <= 0) {
      throw new AppError("Invalid notification user id", 400);
    }

    const notificationData = buildNotification(data);

    const id = await this.repository.create(notificationData);

    const notification = await this.repository.findById(id);

    if (!notification) {
      throw new AppError("Notification could not be created", 500);
    }

    return toNotification(notification);
  }

  async list(query: NotificationQuery) {
    const result = await this.repository.findAll(query);

    return {
      items: result.items.map(toNotification),
      meta: {
        limit: result.limit,
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    };
  }

  async markAsRead(id: number, userId: number): Promise<Notification> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid notification id", 400);
    }

    const notification = await this.repository.markAsRead(id, userId);

    if (!notification) {
      throw new AppError("Notification not found", 404);
    }

    return toNotification(notification);
  }

  async delete(id: number, userId: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError("Invalid notification id", 400);
    }

    await this.repository.delete(id, userId);
  }
}
