import type { RequestHandler } from "express";

import { AppError } from "@/utils";

import { AttendanceSessionService } from "./session.service";
import {
  validateCourseOfferingId,
  validateEditRequest,
  validateSessionId,
  validateStartRequest,
} from "./session.utils";

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
      const input = validateStartRequest(req.body);

      const session = await this.service.startSession(input, this.currentUserId(req));

      res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive: RequestHandler = async (req, res, next) => {
    try {
      const courseOfferingId = validateCourseOfferingId(Number(req.query.course_offering_id));

      const session = await this.service.getActiveSession(courseOfferingId);

      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };

  close: RequestHandler = async (req, res, next) => {
    try {
      const sessionId = validateSessionId(Number(req.params.sessionId));

      const session = await this.service.closeSession(sessionId, this.currentUserId(req));

      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };

  reopen: RequestHandler = async (req, res, next) => {
    try {
      const sessionId = validateSessionId(Number(req.params.sessionId));

      const session = await this.service.reopenSession(sessionId, this.currentUserId(req));

      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };

  edit: RequestHandler = async (req, res, next) => {
    try {
      const sessionId = validateSessionId(Number(req.params.sessionId));
      const input = validateEditRequest(req.body);

      const session = await this.service.editSession(sessionId, input, this.currentUserId(req));

      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };

  getQRCode: RequestHandler = async (req, res, next) => {
    try {
      const sessionId = validateSessionId(Number(req.params.sessionId));

      const qrCode = await this.service.generateQRCode(sessionId, this.currentUserId(req));

      res.status(200).json({
        success: true,
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  };
}
