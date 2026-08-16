import { AppError } from "@/utils";
import type { PaginatedData } from "@/types";

import { CourseRepository } from "../courses";

import { EnrolmentRepository } from "./enrolment.repository";
import { toAssignedCourse, toEnrolledCourse, toStudent } from "./enrolment.mapper";
import type { AssignedCourse, EnrolmentQuery, EnrolledCourse, Student } from "./enrolment.types";
import { validateCourseId } from "./enrolment.utils";

export class EnrolmentService {
  constructor(
    private readonly repository: EnrolmentRepository,
    private readonly courses: CourseRepository,
  ) {}

  async getEnrolledCourses(userId: number): Promise<EnrolledCourse[]> {
    const courses = await this.repository.findEnrolledCourses(userId);

    return courses.map(toEnrolledCourse);
  }

  async getAvailableCourses(userId: number, query: EnrolmentQuery): Promise<PaginatedData<EnrolledCourse>> {
    const result = await this.repository.findAvailableCourses(userId, query);

    return {
      items: result.items.map(toEnrolledCourse),
      meta: result.meta,
    };
  }

  async enrol(courseId: number, userId: number): Promise<void> {
    const validatedCourseId = validateCourseId(courseId);

    const course = await this.courses.findById(validatedCourseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    if (!course.is_active) {
      throw new AppError("Course is not open for enrolment", 400);
    }

    const enrolled = await this.repository.enrol(validatedCourseId, userId);

    if (!enrolled) {
      throw new AppError("Already enrolled in this course", 409);
    }
  }

  async unenrol(courseId: number, userId: number): Promise<void> {
    const validatedCourseId = validateCourseId(courseId);

    const enrolled = await this.repository.isEnrolled(validatedCourseId, userId);

    if (!enrolled) {
      throw new AppError("Not enrolled in this course", 404);
    }

    await this.repository.unenrol(validatedCourseId, userId);
  }

  async getAssignedCourses(userId: number): Promise<AssignedCourse[]> {
    const courses = await this.repository.findAssignedCourses(userId);

    return courses.map(toAssignedCourse);
  }

  async getStudents(courseId: number, query: EnrolmentQuery): Promise<PaginatedData<Student>> {
    const validatedCourseId = validateCourseId(courseId);

    const course = await this.courses.findById(validatedCourseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const result = await this.repository.getStudents(validatedCourseId, query);

    return {
      items: result.items.map(toStudent),
      meta: result.meta,
    };
  }
}
