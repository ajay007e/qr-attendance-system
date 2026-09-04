import type { RequestHandler } from "express";
import { AppError } from "./app.error";
import type { Role } from "@/types";

export function currentUserId(req: Parameters<RequestHandler>[0]): number {
  if (!req.user) {
    throw new AppError("Not authenticated", 401);
  }

  return req.user.id;
}

export function currentUserRole(req: Parameters<RequestHandler>[0]): Role {
  if (!req.user) {
    throw new AppError("Not authenticated", 401);
  }

  return req.user.role;
}
