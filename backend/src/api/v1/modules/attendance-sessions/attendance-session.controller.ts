import type { RequestHandler } from "express";

import { AppError } from "@/utils";

import { AttendanceSessionService } from "./attendance-session.service";
import { validateCourseId, validateStartRequest } from "./attendance-session.utils";

export class AttendanceSessionController {
  constructor(private readonly service: AttendanceSessionService) {}

  private currentUserId = (req: Parameters<RequestHandler>[0]): number => {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    return req.user.id;
  };

  start: RequestHandler = async (req, res, next) => {
    try {
      const courseId = validateCourseId(Number(req.params.courseId));
      const { durationMinutes } = validateStartRequest(req.body);

      const session = await this.service.startSession(courseId, this.currentUserId(req), durationMinutes);

      res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };
}