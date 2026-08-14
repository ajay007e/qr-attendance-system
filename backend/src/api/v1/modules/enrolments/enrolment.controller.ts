import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../../utils/app.error";

import { EnrolmentService } from "./enrolment.service";

import { validateCourseId, validateEnrolRequest, validatePagination } from "./enrolment.utils";

export class EnrolmentController {
  constructor(private readonly service: EnrolmentService) {}

  // =====================================================
  // Authentication
  // =====================================================

  private currentUserId(req: Request): number {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    return req.user.id;
  }

  // =====================================================
  // Student Enrolment
  // =====================================================

  listEnrolled = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.service.getEnrolledCourses(this.currentUserId(req));

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
      const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;

      const pagination = validatePagination(req.query.limit, req.query.offset);

      const courses = await this.service.getAvailableCourses(this.currentUserId(req), search, pagination);

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
      const { courseId } = validateEnrolRequest(req.body);

      await this.service.enrol(courseId, this.currentUserId(req));

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
      const courseId = validateCourseId(Number(req.params.courseId));

      await this.service.unenrol(courseId, this.currentUserId(req));

      res.json({
        success: true,
        message: "Unenrolled successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  // =====================================================
  // Lecturer Courses
  // =====================================================

  listAssigned = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.service.getAssignedCourses(this.currentUserId(req));

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  };

  // =====================================================
  // Course Roster
  // =====================================================

  getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = validateCourseId(Number(req.params.courseId));

      const pagination = validatePagination(req.query.limit, req.query.page, req.query.search);

      const students = await this.service.getStudents(courseId, pagination);

      res.json({
        success: true,
        data: students,
      });
    } catch (error) {
      next(error);
    }
  };
}
