import type { RequestHandler } from "express";

import { DEFAULT_NOTIFICATIONS_LIMIT, MAX_NOTIFICATIONS_LIMIT } from "./notification.constants";
import { NotificationService } from "./notification.service";
import type { NotificationQuery } from "./notification.types";

import { AppError } from "@/utils";

function parseBoolean(value: unknown): boolean | null | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return null;
}

export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  list: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AppError("Not authenticated"));
      }

      const rawLimit = Number(req.query.limit);

      const limit =
        Number.isFinite(rawLimit) && rawLimit > 0
          ? Math.min(rawLimit, MAX_NOTIFICATIONS_LIMIT)
          : DEFAULT_NOTIFICATIONS_LIMIT;

      const cursor = typeof req.query.cursor === "string" ? req.query.cursor : null;

      const isRead = parseBoolean(req.query.is_read);

      if (isRead === null) {
        return next(new AppError("is_read must be true or false"));
      }

      const query: NotificationQuery = {
        userId: req.user.id,
        limit,
        cursor,
        isRead,
      };

      const result = await this.service.list(query);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  markAsRead: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AppError("Not authenticated"));
      }

      const notification = await this.service.markAsRead(Number(req.params.id), req.user.id);

      res.json({
        success: true,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  };

  delete: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new AppError("Not authenticated"));
      }

      await this.service.delete(Number(req.params.id), req.user.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
