import { NextFunction, Request, Response } from "express";

import { UserService } from "./user.service";
import { UserQuery } from "./user.types";

export class UserController {
  constructor(private readonly service: UserService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.create(req.body);

      res.status(201).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: UserQuery = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: typeof req.query.search === "string" ? req.query.search.trim() : undefined,

        role: typeof req.query.role === "string" ? (req.query.role as UserQuery["role"]) : undefined,

        status: typeof req.query.status === "string" ? (req.query.status as UserQuery["status"]) : undefined,
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
      const id = Number(req.params.id);

      const user = await this.service.get(id);

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const user = await this.service.update(id, req.body);

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  setActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const { is_active } = req.body;

      const currentUserId = req.user!.id;

      const user = await this.service.setActive(id, is_active, currentUserId);

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const { password } = req.body;

      await this.service.updatePassword(id, password);

      res.json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  searchLecturers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;

      const lecturers = await this.service.searchLecturers(search);

      res.json({
        success: true,
        data: lecturers,
      });
    } catch (error) {
      next(error);
    }
  };
}
