import type { RequestHandler } from "express";

import { AppError } from "@/utils";

export const notFound: RequestHandler = (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};
