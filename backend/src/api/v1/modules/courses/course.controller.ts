import { NextFunction, Request, Response } from "express";

import { CourseService } from "./course.service";

export class CourseController {
  constructor(private readonly service: CourseService) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.service.list();

      res.json({
        success: true,
        data: courses,
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
      await this.service.assignLecturer(Number(req.params.id), req.body.userId);

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
