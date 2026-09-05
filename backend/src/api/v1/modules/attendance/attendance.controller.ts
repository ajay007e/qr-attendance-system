import type { RequestHandler } from "express";

import { AttendanceService } from "./attendance.service";
import { currentUserId } from "@/utils";
import { validateMarkAttendanceRequest } from "./attendance.utils";

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
}
