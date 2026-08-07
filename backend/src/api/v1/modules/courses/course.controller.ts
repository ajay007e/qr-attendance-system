import { NextFunction, Request, Response } from "express";

import { CourseService } from "./course.service";

import { CourseQuery } from "./course.types";

export class CourseController {
  constructor(private readonly service: CourseService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: CourseQuery = {
        page: Number(req.query.page) || 1,

        limit: Number(req.query.limit) || 10,

        search:
          typeof req.query.search === "string"
            ? req.query.search.trim()
            : undefined,

        session:
          typeof req.query.session === "string"
            ? (req.query.session as CourseQuery["session"])
            : undefined,

        status:
          typeof req.query.status === "string"
            ? (req.query.status as CourseQuery["status"])
            : undefined,
      };

      const result = await this.service.list(query);

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
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

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await this.service.create(req.body);

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await this.service.update(Number(req.params.id), req.body);

      res.json({
        success: true,
        message: "Course updated successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  setActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await this.service.setActive(
        Number(req.params.id),
        req.body.isActive,
      );

      res.json({
        success: true,
        message: "Course status updated successfully",
        data: course,
      });
    } catch (error) {
      next(error);
    }
  };

  getLecturers = async (req: Request, res: Response, next: NextFunction) => {
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

  assignLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.assignLecturer(
        Number(req.params.id),
        req.body.userId,
        req.body.role,
      );

      res.status(201).json({
        success: true,
        message: "Lecturer assigned successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  removeLecturer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.removeLecturer(
        Number(req.params.id),
        Number(req.params.userId),
      );

      res.json({
        success: true,
        message: "Lecturer removed successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}
