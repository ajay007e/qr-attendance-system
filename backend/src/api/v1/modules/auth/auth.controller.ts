import { NextFunction, Request, Response } from "express";

import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  bootstrap = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.bootstrap(req.body);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.service.login(req.body);

      req.session.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  };

  me = async (req: Request, res: Response) => {
    res.json({
      success: true,
      user: req.user,
    });
  };
}
