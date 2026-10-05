import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config/database";

import { DEFAULT_NOTIFICATIONS_LIMIT, MAX_NOTIFICATIONS_LIMIT, NOTIFICATION_COLUMNS } from "./notification.constants";
import type { CreateNotificationData, DatabaseNotification, NotificationQuery } from "./notification.types";

interface NotificationCursor {
  createdAt: string;
  id: number;
}

function encodeCursor(cursor: NotificationCursor): string {
  return Buffer.from(JSON.stringify(cursor)).toString("base64url");
}

function decodeCursor(cursor: string): NotificationCursor {
  try {
    const decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8"));

    if (!decoded || typeof decoded.createdAt !== "string" || !Number.isInteger(decoded.id) || decoded.id <= 0) {
      throw new Error();
    }

    return {
      createdAt: decoded.createdAt,
      id: decoded.id,
    };
  } catch {
    throw new Error("Invalid notification cursor");
  }
}

export class NotificationRepository {
  async create(data: CreateNotificationData): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
        INSERT INTO notifications (
          user_id,
          title,
          message,
          type,
          priority,
          redirect_url,
          reference_type,
          reference_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.user_id,
        data.title,
        data.message,
        data.type,
        data.priority,
        data.redirect_url ?? null,
        data.reference_type ?? null,
        data.reference_id ?? null,
      ],
    );

    return result.insertId;
  }

  async findById(id: number): Promise<DatabaseNotification | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${NOTIFICATION_COLUMNS}
        FROM notifications
        WHERE id = ?
          AND is_deleted = FALSE
        LIMIT 1
      `,
      [id],
    );

    return (rows[0] as DatabaseNotification) ?? null;
  }

  async findAll(query: NotificationQuery): Promise<{
    items: DatabaseNotification[];
    nextCursor: string | null;
    hasMore: boolean;
    limit: number;
  }> {
    const limit = Math.min(MAX_NOTIFICATIONS_LIMIT, Math.max(1, query.limit ?? DEFAULT_NOTIFICATIONS_LIMIT));

    const params: ExecuteValues[] = [query.userId];

    let where = `
      WHERE user_id = ?
        AND is_deleted = FALSE
    `;

    if (query.isRead !== null && query.isRead !== undefined) {
      where += " AND is_read = ?";
      params.push(query.isRead);
    }

    if (query.cursor) {
      const decodedCursor = decodeCursor(query.cursor);

      where += `
        AND (
          created_at < ?
          OR (created_at = ? AND id < ?)
        )
      `;

      params.push(decodedCursor.createdAt, decodedCursor.createdAt, decodedCursor.id);
    }

    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${NOTIFICATION_COLUMNS}
        FROM notifications
        ${where}
        ORDER BY created_at DESC, id DESC
        LIMIT ${limit + 1}
      `,
      params,
    );

    const notifications = rows as DatabaseNotification[];
    const hasMore = notifications.length > limit;

    const items = hasMore ? notifications.slice(0, limit) : notifications;

    const lastItem = items[items.length - 1];

    const nextCursor =
      hasMore && lastItem
        ? encodeCursor({
            createdAt: lastItem.created_at.toISOString(),
            id: lastItem.id,
          })
        : null;

    return {
      items,
      nextCursor,
      hasMore,
      limit,
    };
  }

  async markAsRead(id: number, userId: number): Promise<DatabaseNotification | null> {
    await db.execute(
      `
        UPDATE notifications
        SET
          is_read = TRUE,
          read_at = COALESCE(read_at, CURRENT_TIMESTAMP)
        WHERE id = ?
          AND user_id = ?
          AND is_deleted = FALSE
      `,
      [id, userId],
    );

    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${NOTIFICATION_COLUMNS}
        FROM notifications
        WHERE id = ?
          AND user_id = ?
          AND is_deleted = FALSE
        LIMIT 1
      `,
      [id, userId],
    );

    return (rows[0] as DatabaseNotification) ?? null;
  }

  async delete(id: number, userId: number): Promise<void> {
    await db.execute(
      `
        UPDATE notifications
        SET is_deleted = TRUE
        WHERE id = ?
          AND user_id = ?
          AND is_deleted = FALSE
      `,
      [id, userId],
    );
  }
}
