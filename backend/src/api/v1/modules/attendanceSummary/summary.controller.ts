import type { RequestHandler } from "express";

import { currentUserId, parseQueryNumber, parseQueryString } from "@/utils";

import { AttendanceSummaryService } from "./summary.service";
import { validateCourseOfferingId } from "./summary.utils";

export class AttendanceSummaryController {
  constructor(private readonly service: AttendanceSummaryService) {}

  getSummary: RequestHandler = async (req, res, next) => {
    try {
      const courseOfferingId = validateCourseOfferingId(Number(req.params.id));

      const page = parseQueryNumber(req.query.page, 1);
      const limit = parseQueryNumber(req.query.limit, 10);
      const search = parseQueryString(req.query.search);

      const summary = await this.service.getSummary(courseOfferingId, currentUserId(req), req.user!.role, {
        page,
        limit,
        search,
      });

      res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  };
}