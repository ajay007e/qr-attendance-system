import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../../utils/app.error";

import { EnrolmentService } from "./enrolment.service";

export class EnrolmentController {
  constructor(private readonly service: EnrolmentService) {}

  private currentUserId(req: Request): number {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    return req.user.id;
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
