import { Router } from "express";

import { controller } from ".";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

export const attendanceSessionRouter = Router();

attendanceSessionRouter.use(isAuthenticated);

attendanceSessionRouter.post("/courses/:courseId/start", authorize(ROLES.LECTURER), controller.start);