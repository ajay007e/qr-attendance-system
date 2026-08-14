import { Router } from "express";

import { controller } from ".";

import { authorize, isAuthenticated } from "../../../../middleware/auth.middleware";
import { ROLES } from "@/utils";

export const courseRouter = Router();

courseRouter.use(isAuthenticated);

/* ======================================================
 * Course Read
 * ====================================================== */

courseRouter.get("/:id", authorize(ROLES.SUPER_ADMIN, ROLES.LECTURER, ROLES.STUDENT), controller.get);

/* ======================================================
 * Admin
 * ====================================================== */

courseRouter.use(authorize(ROLES.SUPER_ADMIN));

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

courseRouter.post("/", controller.create);

courseRouter.put("/:id", controller.update);

courseRouter.patch("/:id/status", controller.setActive);
