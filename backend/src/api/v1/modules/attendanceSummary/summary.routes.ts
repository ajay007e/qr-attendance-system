import { Router } from "express";

import { controller } from ".";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

export const attendanceSummaryRouter = Router();

attendanceSummaryRouter.use(isAuthenticated);
attendanceSummaryRouter.use(authorize(ROLES.LECTURER));

attendanceSummaryRouter.get("/:id/attendance-summary", controller.getSummary);