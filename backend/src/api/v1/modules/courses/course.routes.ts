import { Router } from "express";

import { controller } from ".";

import {
  authorize,
  isAuthenticated,
} from "../../../../middleware/auth.middleware";

import { Role } from "../../../../utils/constants/roles";

export const courseRouter = Router();

courseRouter.use(isAuthenticated);

courseRouter.use(authorize(Role.SUPER_ADMIN));

/* ======================================================
 * Lecturer Assignment
 * ====================================================== */

courseRouter.get("/:id/lecturers", controller.getLecturers);

courseRouter.post("/:id/lecturers", controller.assignLecturer);

courseRouter.delete("/:id/lecturers/:userId", controller.removeLecturer);

/* ======================================================
 * Course CRUD
 * ====================================================== */

courseRouter.get("/", controller.list);

courseRouter.get("/:id", controller.get);

courseRouter.post("/", controller.create);

courseRouter.put("/:id", controller.update);

courseRouter.patch("/:id/status", controller.setActive);
