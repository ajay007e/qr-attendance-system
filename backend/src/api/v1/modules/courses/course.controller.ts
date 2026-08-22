import type { RequestHandler } from "express";

import { DEFAULT_LIMIT, DEFAULT_PAGE, parseQueryNumber, parseQueryString } from "@/utils";

import { CourseService } from "./course.service";
import type { CourseQuery, CreateCourseRequest, UpdateCourseRequest, UpdateCourseStatusRequest } from "./course.types";

export class CourseController {
  constructor(private readonly service: CourseService) {}

  list: RequestHandler = async (req, res, next) => {
    try {
      const query: CourseQuery = {
        page: parseQueryNumber(req.query.page, DEFAULT_PAGE),
        limit: parseQueryNumber(req.query.limit, DEFAULT_LIMIT),
        search: parseQueryString(req.query.search),
        status: parseQueryString(req.query.status) as CourseQuery["status"],
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
      const course = await this.service.get(Number(req.params.id));

      res.json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  create: RequestHandler = async (req, res, next) => {
    try {
      const course = await this.service.create(req.body as CreateCourseRequest);

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler = async (req, res, next) => {
    try {
      const course = await this.service.update(Number(req.params.id), req.body as UpdateCourseRequest);

      res.json({
        success: true,
        message: "Course updated successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  setActive: RequestHandler = async (req, res, next) => {
    try {
      const body = req.body as UpdateCourseStatusRequest;

      const course = await this.service.setActive(Number(req.params.id), body.isActive);

      res.json({
        success: true,
        message: "Course status updated successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };
}
