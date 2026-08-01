import { Router } from "express";

import { authRouter } from "./modules/auth/auth.routes";
import { userRouter } from "./modules/users/user.routes";
import { courseRouter } from "./modules/courses/course.routes";

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
