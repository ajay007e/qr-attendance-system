import type { RequestHandler } from "express";

import { AppError } from "@/utils";
import type { Role } from "@/types";

export const isAuthenticated: RequestHandler = (req, _res, next) => {
  if (!req.session.user) {
    return next(new AppError("Not authenticated", 401));
  }

  req.user = req.session.user;

  next();
};

export const authorize = (...roles: Role[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new AppError("Not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access forbidden", 403));
    }

    next();
  };
};
