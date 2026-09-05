import { Router } from "express";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

import { controller } from ".";

export const attendanceRouter = Router();

attendanceRouter.use(isAuthenticated);
attendanceRouter.use(authorize(ROLES.STUDENT));

attendanceRouter.post("/mark", controller.markAttendance);
