import { Router } from "express";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

import { controller } from ".";

export const offeringRouter = Router();

offeringRouter.use(isAuthenticated);

offeringRouter.use(authorize(ROLES.SUPER_ADMIN));

// Offering CRUD
offeringRouter.get("/", controller.list);
offeringRouter.get("/:id", controller.get);
offeringRouter.post("/", controller.create);
offeringRouter.put("/:id", controller.update);

// Lecturer assignment
offeringRouter.get("/:id/lecturers", controller.getLecturers);

offeringRouter.post("/:id/lecturers", controller.assignLecturer);

offeringRouter.delete("/:id/lecturers/:userId", controller.removeLecturer);
