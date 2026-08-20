import { Router } from "express";

import { controller } from ".";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

export const enrolmentRouter = Router();

enrolmentRouter.use(isAuthenticated);

/* ======================================================
 * Student Enrolment
 * ====================================================== */

enrolmentRouter.get("/available", authorize(ROLES.STUDENT), controller.listAvailable);

enrolmentRouter.get("/me", authorize(ROLES.STUDENT), controller.listEnrolled);

enrolmentRouter.post("/", authorize(ROLES.STUDENT), controller.enrol);

enrolmentRouter.delete("/:courseOfferingId", authorize(ROLES.STUDENT), controller.unenrol);

/* ======================================================
 * Lecturer Courses
 * ====================================================== */

enrolmentRouter.get("/lecturer/courses", authorize(ROLES.LECTURER), controller.listAssigned);

/* ======================================================
 * Course Offering Roster
 * ====================================================== */

enrolmentRouter.get(
  "/offerings/:courseOfferingId/students",
  authorize(ROLES.LECTURER, ROLES.STUDENT),
  controller.getStudents,
);
