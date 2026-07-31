import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.session.user) {
    return next(new AppError("Not authenticated", 401));
  }

  req.user = req.session.user;

  next();
};

export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access forbidden", 403));
    }

    next();
  };
};
