import type { RequestHandler } from "express";

import { currentUserId } from "@/utils";

import { AttendanceSessionService } from "./session.service";
import {
  validateCourseOfferingId,
  validateEditRequest,
  validateSessionId,
  validateStartRequest,
} from "./session.utils";

export class AttendanceSessionController {
  constructor(private readonly service: AttendanceSessionService) {}

  start: RequestHandler = async (req, res, next) => {
    try {
      const input = validateStartRequest(req.body);

      const session = await this.service.startSession(input, currentUserId(req));

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

      const session = await this.service.closeSession(sessionId, currentUserId(req));

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

      const session = await this.service.reopenSession(sessionId, currentUserId(req));

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

      const session = await this.service.editSession(sessionId, input, currentUserId(req));

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

      const qrCode = await this.service.generateQRCode(sessionId, currentUserId(req));

      res.status(200).json({
        success: true,
        data: qrCode,
      });
    } catch (error) {
      next(error);
    }
  };
}
