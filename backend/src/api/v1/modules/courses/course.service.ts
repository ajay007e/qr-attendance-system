import { AppError } from "../../../../utils/app.error";
import { Role } from "../../../../utils/constants/roles";

import { UserRepository } from "../users/user.repository";

import { CourseRepository } from "./course.repository";

import {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "./course.types";

export class CourseService {
  constructor(
    private readonly repository: CourseRepository,
    private readonly users: UserRepository,
  ) {}

  /* =====================================================
   * Course CRUD
   * ===================================================== */

  async list(): Promise<Course[]> {
    return this.repository.findAll();
  }

  async get(id: number): Promise<Course> {
    const course = await this.repository.findById(id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return course;
  }

  async create(data: CreateCourseRequest): Promise<Course> {
    if (!data.courseCode?.trim()) {
      throw new AppError("Course code is required", 400);
    }

    if (!data.courseName?.trim()) {
      throw new AppError("Course name is required", 400);
    }

    if (data.semester < 1 || data.semester > 3) {
      throw new AppError("Invalid semester", 400);
    }

    if (data.year < 2000) {
      throw new AppError("Invalid year", 400);
    }

    const existing = await this.repository.findByCode(data.courseCode);

    if (existing) {
      throw new AppError("Course code already exists", 409);
    }

    const id = await this.repository.create(data);

    return this.get(id);
  }

  async update(id: number, data: UpdateCourseRequest): Promise<Course> {
    await this.get(id);

    if (!data.courseCode?.trim()) {
      throw new AppError("Course code is required", 400);
    }

    if (!data.courseName?.trim()) {
      throw new AppError("Course name is required", 400);
    }

    const existing = await this.repository.findByCode(data.courseCode);

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

  async assignLecturer(courseId: number, userId: number): Promise<void> {
    await this.get(courseId);

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

    await this.repository.assignLecturer(courseId, userId);
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
