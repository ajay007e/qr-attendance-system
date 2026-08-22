import type { RequestHandler } from "express";

import { DEFAULT_LIMIT, DEFAULT_PAGE, parseQueryNumber, parseQueryString } from "@/utils";

import { OfferingService } from "./offering.service";
import type {
  AssignLecturerRequest,
  CourseOfferingQuery,
  CreateCourseOfferingRequest,
  UpdateCourseOfferingRequest,
} from "./offering.types";

export class OfferingController {
  constructor(private readonly service: OfferingService) {}

  list: RequestHandler = async (req, res, next) => {
    try {
      const query: CourseOfferingQuery = {
        page: parseQueryNumber(req.query.page, DEFAULT_PAGE),
        limit: parseQueryNumber(req.query.limit, DEFAULT_LIMIT),
        search: parseQueryString(req.query.search),
        session: parseQueryString(req.query.session) as CourseOfferingQuery["session"],
        status: parseQueryString(req.query.status) as CourseOfferingQuery["status"],
      };

      const result = await this.service.list(query);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  get: RequestHandler = async (req, res, next) => {
    try {
      const offering = await this.service.get(Number(req.params.id));

      res.json({
        success: true,
        data: offering,
      });
    } catch (error) {
      next(error);
    }
  };

  create: RequestHandler = async (req, res, next) => {
    try {
      const offering = await this.service.create(req.body as CreateCourseOfferingRequest);

      res.status(201).json({
        success: true,
        message: "Course offering created successfully",
        data: offering,
      });
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler = async (req, res, next) => {
    try {
      const offering = await this.service.update(Number(req.params.id), req.body as UpdateCourseOfferingRequest);

      res.json({
        success: true,
        message: "Course offering updated successfully",
        data: offering,
      });
    } catch (error) {
      next(error);
    }
  };
  getLecturers: RequestHandler = async (req, res, next) => {
    try {
      const lecturers = await this.service.getLecturers(Number(req.params.id));

      res.json({
        success: true,
        data: lecturers,
      });
    } catch (error) {
      next(error);
    }
  };
  assignLecturer: RequestHandler = async (req, res, next) => {
    try {
      const body = req.body as AssignLecturerRequest;

      await this.service.assignLecturer(Number(req.params.id), body.id, body.role);

      res.status(201).json({
        success: true,
        message: "Lecturer assigned successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  removeLecturer: RequestHandler = async (req, res, next) => {
    try {
      await this.service.removeLecturer(Number(req.params.id), Number(req.params.userId));

      res.json({
        success: true,
        message: "Lecturer removed successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
