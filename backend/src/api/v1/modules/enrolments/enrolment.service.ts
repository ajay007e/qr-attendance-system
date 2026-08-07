import { AppError } from "../../../../utils/app.error";

import { CourseRepository } from "../courses/course.repository";

import { EnrolmentRepository } from "./enrolment.repository";

import { CourseStudent, EnrolledCourse } from "./enrolment.types";

export class EnrolmentService {
  constructor(
    private readonly repository: EnrolmentRepository,
    private readonly courses: CourseRepository,
  ) {}

  /* =====================================================
   * Student Enrolment
   * ===================================================== */

  async getEnrolledCourses(userId: number): Promise<EnrolledCourse[]> {
    return this.repository.findEnrolledCourses(userId);
  }

  async getAvailableCourses(
    userId: number,
    search?: string,
  ): Promise<EnrolledCourse[]> {
    return this.repository.findAvailableCourses(userId, search);
  }

  async enrol(courseId: number, userId: number): Promise<void> {
    const course = await this.courses.findById(courseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    if (!course.is_active) {
      throw new AppError("Course is not open for enrolment", 400);
    }

    const enrolled = await this.repository.isEnrolled(courseId, userId);

    if (enrolled) {
      throw new AppError("Already enrolled in this course", 409);
    }

    await this.repository.enrol(courseId, userId);
  }

  async unenrol(courseId: number, userId: number): Promise<void> {
    const enrolled = await this.repository.isEnrolled(courseId, userId);

    if (!enrolled) {
      throw new AppError("Not enrolled in this course", 404);
    }

    await this.repository.unenrol(courseId, userId);
  }

  /* =====================================================
   * Course Roster
   * ===================================================== */

  async getStudents(courseId: number): Promise<CourseStudent[]> {
    const course = await this.courses.findById(courseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return this.repository.getStudents(courseId);
  }
}
