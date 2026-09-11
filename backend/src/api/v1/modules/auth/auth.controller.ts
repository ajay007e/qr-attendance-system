import type { RequestHandler } from "express";
import type { SessionUser } from "@/types";
import { AuthService } from "./auth.service";
import { SESSION_COOKIE_NAME } from "@/utils";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  bootstrap: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.service.bootstrap(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login: RequestHandler = async (req, res, next) => {
    try {
      const user = await this.service.login(req.body);
      const sessionUser: SessionUser = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      req.session.user = sessionUser;
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie(SESSION_COOKIE_NAME);

      res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  };

  me: RequestHandler = (req, res) => {
    res.json({
      success: true,
      data: req.user,
    });
  };
}
