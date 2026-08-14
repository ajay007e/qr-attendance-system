import { Router } from "express";

import { controller } from ".";
import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

export const userRouter = Router();

userRouter.use(isAuthenticated);
userRouter.use(authorize(ROLES.SUPER_ADMIN));

userRouter.get("/", controller.list);
userRouter.post("/", controller.create);

userRouter.get("/lecturers/search", controller.searchLecturers);

userRouter.get("/:id", controller.get);
userRouter.put("/:id", controller.update);
userRouter.patch("/:id/status", controller.setActive);
userRouter.patch("/:id/password", controller.updatePassword);
