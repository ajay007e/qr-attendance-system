import type { RequestHandler } from "express";

import { AttendanceService } from "./attendance.service";
import { AppError, currentUserId, parseQueryNumber, parseQueryString } from "@/utils";
import {
  validateMarkAttendanceRequest,
  validateSessionAttendanceQuery,
  validateStudentAttendanceQuery,
} from "./attendance.utils";
import type { SessionAttendanceQuery, StudentAttendanceQuery } from "./attendance.types";

export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  markAttendance: RequestHandler = async (req, res, next) => {
    try {
      const input = validateMarkAttendanceRequest(req.body);
      const result = await this.service.markQrAttendance(input, currentUserId(req));

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getSessionAttendance: RequestHandler = async (req, res, next) => {
    try {
      const sessionId = Number(req.params.sessionId);

      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        throw new AppError("Invalid session ID", 400);
      }

      const query = validateSessionAttendanceQuery({
        page: parseQueryNumber(req.query.page, 1),
        limit: parseQueryNumber(req.query.limit, 10),
        search: parseQueryString(req.query.search),
        status: parseQueryString(req.query.status) as SessionAttendanceQuery["status"] | undefined,
        attendanceMethod: parseQueryString(req.query.attendanceMethod) as
          SessionAttendanceQuery["attendanceMethod"] | undefined,
        locationStatus: parseQueryString(req.query.locationStatus) as
          SessionAttendanceQuery["locationStatus"] | undefined,
      });

      const result = await this.service.getSessionAttendance(sessionId, query, currentUserId(req));

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getMyAttendance: RequestHandler = async (req, res, next) => {
    try {
      const courseOfferingId = Number(req.params.courseOfferingId);

      if (!Number.isInteger(courseOfferingId) || courseOfferingId <= 0) {
        throw new AppError("Invalid course offering ID", 400);
      }

      const query = validateStudentAttendanceQuery({
        limit: parseQueryNumber(req.query.limit, 10),
        cursor: parseQueryString(req.query.cursor),
        status: parseQueryString(req.query.status) as StudentAttendanceQuery["status"] | undefined,
        classType: parseQueryString(req.query.classType),
      });

      const result = await this.service.getMyAttendance(query, currentUserId(req), courseOfferingId);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  getMySummary: RequestHandler = async (req, res, next) => {
    try {
      const courseOfferingId = Number(req.params.courseOfferingId);

      if (!Number.isInteger(courseOfferingId) || courseOfferingId <= 0) {
        throw new AppError("Invalid course offering ID", 400);
      }

      const classType = parseQueryString(req.query.classType);

      const result = await this.service.getMySummary(currentUserId(req), courseOfferingId, classType);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
