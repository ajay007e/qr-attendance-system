import { Router } from "express";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

import { controller } from ".";

export const courseRouter = Router();

courseRouter.use(isAuthenticated);

// Public/authenticated course access
courseRouter.get("/:id", authorize(ROLES.SUPER_ADMIN, ROLES.LECTURER, ROLES.STUDENT), controller.get);

// Super Admin only
courseRouter.use(authorize(ROLES.SUPER_ADMIN));

// Course CRUD
courseRouter.get("/", controller.list);
courseRouter.post("/", controller.create);
courseRouter.put("/:id", controller.update);
courseRouter.patch("/:id/status", controller.setActive);
