import { Router } from "express";

import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/users/user.routes";
import { courseRouter } from "./modules/courses/course.routes";
import { offeringRouter } from "./modules/offerings/offering.routes";
import { enrolmentRouter } from "./modules/enrolments/enrolment.routes";
import { sessionRouter } from "./modules/sessions/session.routes";
import { attendanceRouter } from "./modules/attendance/attendance.routes";
import { webSocketRouter } from "./modules/web-socket/routes";

export const v1Router = Router();

v1Router.get("/", (_req, res) => {
  res.json({
    version: "v1",
    status: "ok",
  });
});

v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/courses", courseRouter);
v1Router.use("/enrolments", enrolmentRouter);
v1Router.use("/offerings", offeringRouter);
v1Router.use("/sessions", sessionRouter);
v1Router.use("/attendance", attendanceRouter);
v1Router.use("/ws", webSocketRouter);
