import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../../utils/app.error";

import { EnrolmentService } from "./enrolment.service";
import { Pagination } from "./enrolment.types";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export class EnrolmentController {
  constructor(private readonly service: EnrolmentService) {}

  // Single auth guard kept on purpose: the middleware already populates
  // req.user, but this fails loud if that ever regresses instead of reading
  // an id off undefined.
  private currentUserId(req: Request): number {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    return req.user.id;
  }

  private pagination(req: Request): Pagination {
    const rawLimit = Number(req.query.limit);
    const rawOffset = Number(req.query.offset);

    const limit =
      Number.isFinite(rawLimit) && rawLimit > 0
        ? Math.min(Math.floor(rawLimit), MAX_LIMIT)
        : DEFAULT_LIMIT;

    const offset =
      Number.isFinite(rawOffset) && rawOffset > 0 ? Math.floor(rawOffset) : 0;

    return { limit, offset };
  }

  listEnrolled = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.service.getEnrolledCourses(
        this.currentUserId(req),
      );

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  };

  listAvailable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search =
        typeof req.query.search === "string" ? req.query.search : undefined;

      const courses = await this.service.getAvailableCourses(
        this.currentUserId(req),
        search,
        this.pagination(req),
      );

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  };

  enrol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.enrol(Number(req.body.courseId), this.currentUserId(req));

      res.status(201).json({
        success: true,
        message: "Enrolled successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  unenrol = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.unenrol(
        Number(req.params.courseId),
        this.currentUserId(req),
      );

      res.json({
        success: true,
        message: "Unenrolled successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const students = await this.service.getStudents(
        Number(req.params.courseId),
        this.pagination(req),
      );

      res.json({
        success: true,
        data: students,
      });
    } catch (error) {
      next(error);
    }
  };
}
