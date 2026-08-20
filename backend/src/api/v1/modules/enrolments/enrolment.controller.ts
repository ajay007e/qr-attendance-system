import type { RequestHandler } from "express";

import { AppError, parseQueryNumber, parseQueryString } from "@/utils";

import { EnrolmentService } from "./enrolment.service";
import { validateCourseOfferingId, validateEnrolRequest } from "./enrolment.utils";

export class EnrolmentController {
  constructor(private readonly service: EnrolmentService) {}

  private currentUserId = (req: Parameters<RequestHandler>[0]): number => {
    if (!req.user) {
      throw new AppError("Not authenticated", 401);
    }

    return req.user.id;
  };

  // =====================================================
  // Student Enrolment
  // =====================================================

  listEnrolled: RequestHandler = async (req, res, next) => {
    try {
      const offerings = await this.service.getEnrolledCourses(this.currentUserId(req));

      res.json({
        success: true,
        data: offerings,
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

      const offerings = await this.service.getAvailableCourses(this.currentUserId(req), {
        search,
        page,
        limit,
      });

      res.json({
        success: true,
        data: offerings,
      });
    } catch (error) {
      next(error);
    }
  };

  enrol: RequestHandler = async (req, res, next) => {
    try {
      const { courseOfferingId } = validateEnrolRequest(req.body);

      await this.service.enrol(courseOfferingId, this.currentUserId(req));

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
      const courseOfferingId = validateCourseOfferingId(Number(req.params.courseOfferingId));

      await this.service.unenrol(courseOfferingId, this.currentUserId(req));

      res.json({
        success: true,
        message: "Unenrolled successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  // =====================================================
  // Lecturer Offerings
  // =====================================================

  listAssigned: RequestHandler = async (req, res, next) => {
    try {
      const offerings = await this.service.getAssignedCourses(this.currentUserId(req));

      res.json({
        success: true,
        data: offerings,
      });
    } catch (error) {
      next(error);
    }
  };

  // =====================================================
  // Offering Roster
  // =====================================================

  getStudents: RequestHandler = async (req, res, next) => {
    try {
      const courseOfferingId = validateCourseOfferingId(Number(req.params.courseOfferingId));

      const page = parseQueryNumber(req.query.page, 1);
      const limit = parseQueryNumber(req.query.limit, 10);
      const search = parseQueryString(req.query.search);

      const students = await this.service.getStudents(courseOfferingId, {
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
