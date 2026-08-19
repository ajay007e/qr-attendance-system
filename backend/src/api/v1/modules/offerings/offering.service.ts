import { AppError, ROLES } from "@/utils";

import { CourseRepository } from "../courses";
import { UserRepository } from "../users";

import { OfferingRepository } from "./offering.repository";
import { toCourseOffering, toCourseOfferingListItem } from "./offering.mapper";
import type {
  CourseLecturerRole,
  CourseOffering,
  CourseOfferingQuery,
  CreateCourseOfferingRequest,
  Lecturer,
  UpdateCourseOfferingRequest,
} from "./offering.types";
import {
  validateCreateCourseOfferingRequest,
  validateCourseOfferingId,
  validateUpdateCourseOfferingRequest,
  validateAssignLecturerRequest,
} from "./offering.utils";
import { toLecturer } from "./offering.mapper";

export class OfferingService {
  constructor(
    private readonly repository: OfferingRepository,
    private readonly courses: CourseRepository,
    private readonly users: UserRepository,
  ) {}

  async list(query: CourseOfferingQuery) {
    const result = await this.repository.findAll(query);

    return {
      items: result.items.map(toCourseOfferingListItem),
      meta: result.meta,
    };
  }

  async get(id: number): Promise<CourseOffering> {
    validateCourseOfferingId(id);

    const offering = await this.repository.findById(id);

    if (!offering) {
      throw new AppError("Course offering not found", 404);
    }

    return toCourseOffering(offering);
  }

  async create(data: CreateCourseOfferingRequest): Promise<CourseOffering> {
    const validated = validateCreateCourseOfferingRequest(data);

    const course = await this.courses.findById(validated.courseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    if (!course.is_active) {
      throw new AppError("Cannot create offering for an inactive course", 400);
    }

    const existing = await this.repository.findByCourseYearSession(
      validated.courseId,
      validated.academicYear,
      validated.session,
    );

    if (existing) {
      throw new AppError("Course offering already exists for this academic year and session", 409);
    }

    const id = await this.repository.create({
      course_id: validated.courseId,
      academic_year: validated.academicYear,
      session: validated.session,
      start_date: validated.startDate ? new Date(validated.startDate) : null,
      end_date: validated.endDate ? new Date(validated.endDate) : null,
    });

    return this.get(id);
  }

  async update(id: number, data: UpdateCourseOfferingRequest): Promise<CourseOffering> {
    await this.get(id);

    const validated = validateUpdateCourseOfferingRequest(data);

    if (validated.courseId !== undefined) {
      const course = await this.courses.findById(validated.courseId);

      if (!course) {
        throw new AppError("Course not found", 404);
      }

      if (!course.is_active) {
        throw new AppError("Cannot assign offering to an inactive course", 400);
      }
    }

    const current = await this.repository.findById(id);

    if (!current) {
      throw new AppError("Course offering not found", 404);
    }

    const courseId = validated.courseId ?? current.course_id;
    const academicYear = validated.academicYear ?? current.academic_year;
    const session = validated.session ?? current.session;

    const duplicate = await this.repository.findByCourseYearSession(courseId, academicYear, session);

    if (duplicate && duplicate.id !== id) {
      throw new AppError("Course offering already exists for this academic year and session", 409);
    }

    await this.repository.update(id, {
      course_id: validated.courseId,
      academic_year: validated.academicYear,
      session: validated.session,
      start_date: validated.startDate ? new Date(validated.startDate) : validated.startDate === null ? null : undefined,
      end_date: validated.endDate ? new Date(validated.endDate) : validated.endDate === null ? null : undefined,
    });

    return this.get(id);
  }
  async getLecturers(offeringId: number): Promise<Lecturer[]> {
    await this.get(offeringId);

    const lecturers = await this.repository.getLecturers(offeringId);

    return lecturers.map(toLecturer);
  }
  async assignLecturer(offeringId: number, userId: number, role: CourseLecturerRole): Promise<void> {
    await this.get(offeringId);

    const validated = validateAssignLecturerRequest(userId, role);

    const lecturer = await this.users.findById(validated.userId);

    if (!lecturer) {
      throw new AppError("Lecturer not found", 404);
    }

    if (lecturer.role !== ROLES.LECTURER) {
      throw new AppError("User is not a lecturer", 400);
    }

    const assigned = await this.repository.isLecturerAssigned(offeringId, validated.userId);

    if (assigned) {
      throw new AppError("Lecturer already assigned", 409);
    }

    await this.repository.assignLecturer(offeringId, validated.userId, validated.role);
  }
  async removeLecturer(offeringId: number, userId: number): Promise<void> {
    await this.get(offeringId);

    if (!Number.isInteger(userId) || userId <= 0) {
      throw new AppError("Invalid user id", 400);
    }

    const assigned = await this.repository.isLecturerAssigned(offeringId, userId);

    if (!assigned) {
      throw new AppError("Lecturer is not assigned to this offering", 404);
    }

    await this.repository.removeLecturer(offeringId, userId);
  }
}
