import type { RequestHandler } from "express";

import { AppError, parseQueryNumber, parseQueryString } from "@/utils";

import { EnrolmentService } from "./enrolment.service";
import { validateCourseId, validateEnrolRequest } from "./enrolment.utils";

export class EnrolmentController {
  constructor(private readonly service: EnrolmentService) {}

  private currentUserId = (req: Parameters<RequestHandler>[0]): number => {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    return req.user.id;
  };

  listEnrolled: RequestHandler = async (req, res, next) => {
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

  listAvailable: RequestHandler = async (req, res, next) => {
    try {
      const page = parseQueryNumber(req.query.page, 1);
      const limit = parseQueryNumber(req.query.limit, 20);
      const search = parseQueryString(req.query.search);

      const courses = await this.service.getAvailableCourses(this.currentUserId(req), { search, page, limit });

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  };

  enrol: RequestHandler = async (req, res, next) => {
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

  unenrol: RequestHandler = async (req, res, next) => {
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

  listAssigned: RequestHandler = async (req, res, next) => {
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

  getStudents: RequestHandler = async (req, res, next) => {
    try {
      const courseId = validateCourseId(Number(req.params.courseId));

      const page = parseQueryNumber(req.query.page, 1);
      const limit = parseQueryNumber(req.query.limit, 10);
      const search = parseQueryString(req.query.search);

      const students = await this.service.getStudents(courseId, {
        page,
        limit,
        search,
      });

      res.json({
        success: true,
        data: students,
      });
    } catch (error) {
      next(error);
    }
  };
}
