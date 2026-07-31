import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/app.error";
import { env } from "../config/env";

export const verifyApiKey = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const apiKey = req.header("x-admin-api-key");

  if (!apiKey) {
    return next(new AppError("API key missing", 401));
  }

  if (apiKey !== env.adminApiKey) {
    return next(new AppError("Invalid API key", 401));
  }

  next();
};
