import { AppError } from "../../../../utils/app.error";
import { Role } from "../../../../utils/constants/roles";

import { UserRepository } from "../users/user.repository";

import { CourseRepository } from "./course.repository";

import {
  Course,
  CourseLecturerRole,
  CourseQuery,
  CreateCourseRequest,
  PaginatedCourses,
  UpdateCourseRequest,
} from "./course.types";

import {
  validateAssignLecturerRequest,
  validateCreateCourseRequest,
  validateCourseId,
  validateUpdateCourseRequest,
} from "./course.utils";

export class CourseService {
  constructor(
    private readonly repository: CourseRepository,
    private readonly users: UserRepository,
  ) {}

  /* =====================================================
   * Course CRUD
   * ===================================================== */

  async list(query: CourseQuery): Promise<PaginatedCourses> {
    return this.repository.findAll(query);
  }

  async get(id: number): Promise<Course> {
    validateCourseId(id);

    const course = await this.repository.findById(id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return course;
  }

  async create(data: CreateCourseRequest): Promise<Course> {
    const validated = validateCreateCourseRequest(data);

    const existing = await this.repository.findByCode(validated.courseCode);

    if (existing) {
      throw new AppError("Course code already exists", 409);
    }

    const id = await this.repository.create(validated);

    return this.get(id);
  }

  async update(id: number, data: UpdateCourseRequest): Promise<Course> {
    await this.get(id);

    const validated = validateUpdateCourseRequest(data);

    const existing = await this.repository.findByCode(validated.courseCode);

    if (existing && existing.id !== id) {
      throw new AppError("Course code already exists", 409);
    }

    await this.repository.update(id, validated);

    return this.get(id);
  }

  async setActive(id: number, isActive: boolean): Promise<Course> {
    await this.get(id);

    if (typeof isActive !== "boolean") {
      throw new AppError("isActive must be a boolean", 400);
    }

    await this.repository.updateStatus(id, isActive);

    return this.get(id);
  }

  /* =====================================================
   * Lecturer Assignment
   * ===================================================== */

  async getLecturers(courseId: number) {
    await this.get(courseId);

    return this.repository.getLecturers(courseId);
  }

  async assignLecturer(courseId: number, userId: number, role: CourseLecturerRole): Promise<void> {
    await this.get(courseId);

    const validated = validateAssignLecturerRequest(userId, role);

    const lecturer = await this.users.findById(validated.userId);

    if (!lecturer) {
      throw new AppError("Lecturer not found", 404);
    }

    if (lecturer.role !== Role.LECTURER) {
      throw new AppError("User is not a lecturer", 400);
    }

    const assigned = await this.repository.isLecturerAssigned(courseId, validated.userId);

    if (assigned) {
      throw new AppError("Lecturer already assigned", 409);
    }

    await this.repository.assignLecturer(courseId, validated.userId, validated.role);
  }

  async removeLecturer(courseId: number, userId: number): Promise<void> {
    await this.get(courseId);

    if (!Number.isInteger(userId) || userId <= 0) {
      throw new AppError("Invalid user id", 400);
    }

    const assigned = await this.repository.isLecturerAssigned(courseId, userId);

    if (!assigned) {
      throw new AppError("Lecturer is not assigned to this course", 404);
    }

    await this.repository.removeLecturer(courseId, userId);
  }
}
