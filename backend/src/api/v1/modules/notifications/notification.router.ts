import { Router } from "express";

import { isAuthenticated } from "@/middleware";

import { controller } from ".";

export const notificationRouter = Router();

notificationRouter.use(isAuthenticated);

notificationRouter.get("/", controller.list);
notificationRouter.patch("/:id/read", controller.markAsRead);
notificationRouter.delete("/:id", controller.delete);
