import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app.error";

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};
