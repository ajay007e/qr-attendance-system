import { Router } from "express";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

import { controller } from ".";

export const attendanceRouter = Router();

attendanceRouter.use(isAuthenticated);
attendanceRouter.post("/scan", authorize(ROLES.STUDENT), controller.markAttendance);
attendanceRouter.get("/student/:courseOfferingId", authorize(ROLES.STUDENT), controller.getMyAttendance);
attendanceRouter.get("/:sessionId", authorize(ROLES.LECTURER), controller.getSessionAttendance);
