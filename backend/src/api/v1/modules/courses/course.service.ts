import { AppError } from "@/utils";

import { CourseRepository } from "./course.repository";
import { toCreateCourseData, toCourse, toUpdateCourseData } from "./course.mapper";
import type { Course, CourseQuery, CreateCourseRequest, UpdateCourseRequest } from "./course.types";
import { validateCreateCourseRequest, validateCourseId, validateUpdateCourseRequest } from "./course.utils";

export class CourseService {
  constructor(private readonly repository: CourseRepository) {}

  async list(query: CourseQuery) {
    const result = await this.repository.findAll(query);

    return {
      items: result.items.map(toCourse),
      meta: result.meta,
    };
  }

  async get(id: number): Promise<Course> {
    validateCourseId(id);

    const course = await this.repository.findById(id);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return toCourse(course);
  }

  async create(data: CreateCourseRequest): Promise<Course> {
    const validated = validateCreateCourseRequest(data);

    const existing = await this.repository.findByCode(validated.courseCode);

    if (existing) {
      throw new AppError("Course code already exists", 409);
    }

    const id = await this.repository.create(toCreateCourseData(validated));

    return this.get(id);
  }

  async update(id: number, data: UpdateCourseRequest): Promise<Course> {
    await this.get(id);

    const validated = validateUpdateCourseRequest(data);

    const existing = await this.repository.findByCode(validated.courseCode);

    if (existing && existing.id !== id) {
      throw new AppError("Course code already exists", 409);
    }

    await this.repository.update(id, toUpdateCourseData(validated));

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
}
