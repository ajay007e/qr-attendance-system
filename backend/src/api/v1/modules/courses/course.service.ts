import { AppError } from "../../../../utils/app.error";
import { Role } from "../../../../utils/constants/roles";

import { UserRepository } from "../users/user.repository";

import { CourseRepository } from "./course.repository";

import {
  Course,
  CourseQuery,
  CreateCourseRequest,
  UpdateCourseRequest,
  PaginatedCourses,
  CourseLecturerRole,
} from "./course.types";

const VALID_SESSIONS = [
  "ANNUAL",
  "SPRING",
  "WINTER",
  "AUTUMN",
  "TRIMESTER_1",
  "TRIMESTER_2",
  "TRIMESTER_3",
];

const VALID_LECTURER_ROLES = ["PRIMARY", "SECONDARY", "TUTOR"];

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
    const course = await this.repository.findById(id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return course;
  }

  async create(data: CreateCourseRequest): Promise<Course> {
    if (!data.course_code?.trim()) {
      throw new AppError("Course code is required", 400);
    }

    if (!data.course_name?.trim()) {
      throw new AppError("Course name is required", 400);
    }

    if (!data.credits || data.credits <= 0) {
      throw new AppError("Invalid credits", 400);
    }

    if (!VALID_SESSIONS.includes(data.session)) {
      throw new AppError("Invalid course session", 400);
    }

    const existing = await this.repository.findByCode(data.course_code);

    if (existing) {
      throw new AppError("Course code already exists", 409);
    }

    const id = await this.repository.create(data);

    return this.get(id);
  }

  async update(id: number, data: UpdateCourseRequest): Promise<Course> {
    await this.get(id);

    if (!data.course_code?.trim()) {
      throw new AppError("Course code is required", 400);
    }

    if (!data.course_name?.trim()) {
      throw new AppError("Course name is required", 400);
    }

    if (!data.credits || data.credits <= 0) {
      throw new AppError("Invalid credits", 400);
    }

    if (!VALID_SESSIONS.includes(data.session)) {
      throw new AppError("Invalid course session", 400);
    }

    const existing = await this.repository.findByCode(data.course_code);

    if (existing && existing.id !== id) {
      throw new AppError("Course code already exists", 409);
    }

    await this.repository.update(id, data);

    return this.get(id);
  }

  async setActive(id: number, isActive: boolean): Promise<Course> {
    await this.get(id);

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

  async assignLecturer(
    courseId: number,
    userId: number,
    role: CourseLecturerRole,
  ): Promise<void> {
    await this.get(courseId);

    if (!VALID_LECTURER_ROLES.includes(role)) {
      throw new AppError("Invalid lecturer role", 400);
    }

    const lecturer = await this.users.findById(userId);

    if (!lecturer) {
      throw new AppError("Lecturer not found", 404);
    }

    if (lecturer.role !== Role.LECTURER) {
      throw new AppError("User is not a lecturer", 400);
    }

    const assigned = await this.repository.isLecturerAssigned(courseId, userId);

    if (assigned) {
      throw new AppError("Lecturer already assigned", 409);
    }

    await this.repository.assignLecturer(courseId, userId, role);
  }

  async removeLecturer(courseId: number, userId: number): Promise<void> {
    await this.get(courseId);

    const assigned = await this.repository.isLecturerAssigned(courseId, userId);

    if (!assigned) {
      throw new AppError("Lecturer is not assigned to this course", 404);
    }

    await this.repository.removeLecturer(courseId, userId);
  }
}
