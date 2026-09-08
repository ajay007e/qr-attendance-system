import type { RequestHandler } from "express";

import { AttendanceService } from "./attendance.service";
import { AppError, currentUserId, parseQueryNumber, parseQueryString } from "@/utils";
import { validateMarkAttendanceRequest, validateSessionAttendanceQuery } from "./attendance.utils";
import type { SessionAttendanceQuery } from "./attendance.types";

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

        attendanceMethod: parseQueryString(req.query.attendance_method) as
          SessionAttendanceQuery["attendanceMethod"] | undefined,

        locationStatus: parseQueryString(req.query.location_status) as
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
}
