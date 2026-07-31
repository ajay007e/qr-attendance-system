import { NextFunction, Request, Response } from "express";

import { UserService } from "./user.service";

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
      const users = await this.service.list();

      res.json({
        success: true,
        users,
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

      const { isActive } = req.body;

      const currentUserId = req.user!.id;

      const user = await this.service.setActive(id, isActive, currentUserId);

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
}
