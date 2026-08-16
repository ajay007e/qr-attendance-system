import type { RequestHandler } from "express";

import { env } from "@/config";
import { AppError, ADMIN_API_KEY_HEADER } from "@/utils";

export const verifyApiKey: RequestHandler = (req, _res, next) => {
  const apiKey = req.header(ADMIN_API_KEY_HEADER);

  if (!apiKey) {
    return next(new AppError("API key missing", 401));
  }

  if (apiKey !== env.adminApiKey) {
    return next(new AppError("Invalid API key", 401));
  }

  next();
};
