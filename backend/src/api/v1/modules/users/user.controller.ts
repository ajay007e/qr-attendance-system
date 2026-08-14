import type { RequestHandler } from "express";

import { UserService } from "./user.service";
import type { LecturerSearchQuery, UserQuery } from "./user.types";
import { parseLecturerSearchQuery, parseUserQuery } from "./user.query";

export class UserController {
  constructor(private readonly service: UserService) {}

  create: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.service.create(req.body);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  list: RequestHandler = async (req, res, next) => {
    try {
      const query: UserQuery = parseUserQuery(req.query);
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
      const user = await this.service.get(Number(req.params.id));

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.service.update(Number(req.params.id), req.body);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  setActive: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.service.setActive(Number(req.params.id), req.body.isActive, req.user!.id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePassword: RequestHandler = async (req, res, next) => {
    try {
      await this.service.updatePassword(Number(req.params.id), req.body.password);

      res.json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  searchLecturers: RequestHandler = async (req, res, next) => {
    try {
      const query: LecturerSearchQuery = parseLecturerSearchQuery(req.query);
      const lecturers = await this.service.searchLecturers(query);

      res.json({
        success: true,
        data: lecturers,
      });
    } catch (error) {
      next(error);
    }
  };
}
