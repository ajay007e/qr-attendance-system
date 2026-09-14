import type { RequestHandler } from "express";

import { AppError } from "@/utils";

import { AttendanceSummaryService } from "./summary.service";
import { validateCourseOfferingId } from "./summary.utils";

export class AttendanceSummaryController {
  constructor(private readonly service: AttendanceSummaryService) {}

  getSummary: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        throw new AppError("Not authenticated", 401);
      }

      const courseOfferingId = validateCourseOfferingId(Number(req.params.id));

      const summary = await this.service.getSummary(courseOfferingId, req.user.id, req.user.role);

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  };
}