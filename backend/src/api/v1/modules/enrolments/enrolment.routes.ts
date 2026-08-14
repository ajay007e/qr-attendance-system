import { Router } from "express";

import { controller } from ".";

import { authorize, isAuthenticated } from "../../../../middleware/auth.middleware";

import { Role } from "../../../../utils/constants/roles";

export const enrolmentRouter = Router();

enrolmentRouter.use(isAuthenticated);

/* ======================================================
 * Student Enrolment
 * ====================================================== */

enrolmentRouter.get("/available", authorize(Role.STUDENT), controller.listAvailable);
enrolmentRouter.get("/me", authorize(Role.STUDENT), controller.listEnrolled);
enrolmentRouter.post("/", authorize(Role.STUDENT), controller.enrol);
enrolmentRouter.delete("/:courseId", authorize(Role.STUDENT), controller.unenrol);

/* ======================================================
 * Lecturer Courses
 * ====================================================== */

enrolmentRouter.get("/lecturer/courses", authorize(Role.LECTURER), controller.listAssigned);

/* ======================================================
 * Course Roster
 * ====================================================== */

enrolmentRouter.get("/courses/:courseId/students", authorize(Role.LECTURER, Role.STUDENT), controller.getStudents);
