import { Router } from "express";

import { controller } from ".";
import {
  isAuthenticated,
  authorize,
} from "../../../../middleware/auth.middleware";

import { Role } from "../../../../utils/constants/roles";

export const userRouter = Router();

userRouter.use(isAuthenticated);

userRouter.use(authorize(Role.SUPER_ADMIN));

userRouter.get("/", controller.list);

userRouter.get("/:id", controller.get);

userRouter.post("/", controller.create);

userRouter.put("/:id", controller.update);

userRouter.patch("/:id/status", controller.setActive);

userRouter.patch("/:id/password", controller.updatePassword);

userRouter.get("/lecturers/search", controller.searchLecturers);
