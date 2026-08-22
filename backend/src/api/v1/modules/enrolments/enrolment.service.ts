import { AppError } from "@/utils";
import type { PaginatedData } from "@/types";

import { OfferingRepository } from "../offerings";

import { EnrolmentRepository } from "./enrolment.repository";
import { toAssignedCourse, toEnrolledCourse, toStudent } from "./enrolment.mapper";

import type { AssignedCourse, EnrolmentQuery, EnrolledCourse, Student } from "./enrolment.types";

import { validateCourseOfferingId } from "./enrolment.utils";

export class EnrolmentService {
  constructor(
    private readonly repository: EnrolmentRepository,
    private readonly offerings: OfferingRepository,
  ) {}

  // =====================================================
  // Student Enrolment
  // =====================================================

  async getEnrolledCourses(userId: number): Promise<EnrolledCourse[]> {
    const offerings = await this.repository.findEnrolledCourses(userId);

    return offerings.map(toEnrolledCourse);
  }

  async getAvailableCourses(userId: number, query: EnrolmentQuery): Promise<PaginatedData<EnrolledCourse>> {
    const result = await this.repository.findAvailableCourses(userId, query);

    return {
      items: result.items.map(toEnrolledCourse),
      meta: result.meta,
    };
  }

  async enrol(offeringId: number, userId: number): Promise<void> {
    const validatedOfferingId = validateCourseOfferingId(offeringId);

    const offering = await this.offerings.findById(validatedOfferingId);

    if (!offering) {
      throw new AppError("Course offering not found", 404);
    }

    if (offering.status !== "enrol") {
      throw new AppError("Course offering is not open for enrolment", 400);
    }

    const enrolled = await this.repository.enrol(validatedOfferingId, userId);

    if (!enrolled) {
      throw new AppError("Already enrolled in this course offering", 409);
    }
  }

  async unenrol(offeringId: number, userId: number): Promise<void> {
    const validatedOfferingId = validateCourseOfferingId(offeringId);

    const enrolled = await this.repository.isEnrolled(validatedOfferingId, userId);

    if (!enrolled) {
      throw new AppError("Not enrolled in this course offering", 404);
    }

    await this.repository.unenrol(validatedOfferingId, userId);
  }

  // =====================================================
  // Lecturer Offerings
  // =====================================================

  async getAssignedCourses(userId: number): Promise<AssignedCourse[]> {
    const offerings = await this.repository.findAssignedCourses(userId);

    return offerings.map(toAssignedCourse);
  }

  // =====================================================
  // Offering Roster
  // =====================================================

  async getStudents(offeringId: number, query: EnrolmentQuery): Promise<PaginatedData<Student>> {
    const validatedOfferingId = validateCourseOfferingId(offeringId);

    const offering = await this.offerings.findById(validatedOfferingId);

    if (!offering) {
      throw new AppError("Course offering not found", 404);
    }

    const result = await this.repository.getStudents(validatedOfferingId, query);

    return {
      items: result.items.map(toStudent),
      meta: result.meta,
    };
  }
}
