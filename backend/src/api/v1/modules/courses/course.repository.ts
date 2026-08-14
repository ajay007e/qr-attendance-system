import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config/database";
import type { PaginatedData } from "@/types";

import { COURSE_COLUMNS, COURSE_LECTURER_COLUMNS } from "./course.constants";

import type {
  CourseQuery,
  CreateCourseData,
  DatabaseCourse,
  DatabaseLecturer,
  CourseLecturerRole,
  UpdateCourseData,
} from "./course.types";
import { DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, DEFAULT_PAGE } from "@/utils";

export class CourseRepository {
  async findAll(query: CourseQuery): Promise<PaginatedData<DatabaseCourse>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const offset = (page - 1) * limit;

    let where = "WHERE 1 = 1";
    const params: ExecuteValues[] = [];

    if (query.search) {
      where += `
        AND (
          course_code LIKE ?
          OR course_name LIKE ?
        )
      `;

      const keyword = `%${query.search}%`;

      params.push(keyword, keyword);
    }

    if (query.session) {
      where += " AND session = ?";
      params.push(query.session);
    }

    if (query.status) {
      where += " AND is_active = ?";
      params.push(query.status === "ACTIVE");
    }

    const [countRows] = await db.execute<RowDataPacket[]>(
      `
        SELECT COUNT(*) AS total
        FROM courses
        ${where}
      `,
      params,
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${COURSE_COLUMNS}
        FROM courses
        ${where}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `,
      [...params, limit, offset],
    );

    return {
      items: rows as DatabaseCourse[],
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: number): Promise<DatabaseCourse | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${COURSE_COLUMNS}
        FROM courses
        WHERE id = ?
        LIMIT 1
      `,
      [id],
    );

    return (rows[0] as DatabaseCourse) ?? null;
  }

  async findByCode(courseCode: string): Promise<DatabaseCourse | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${COURSE_COLUMNS}
        FROM courses
        WHERE course_code = ?
        LIMIT 1
      `,
      [courseCode],
    );

    return (rows[0] as DatabaseCourse) ?? null;
  }

  async create(data: CreateCourseData): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
        INSERT INTO courses (
          course_code,
          course_name,
          description,
          credits,
          session
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [data.course_code, data.course_name, data.description, data.credits, data.session],
    );

    return result.insertId;
  }

  async update(id: number, data: UpdateCourseData): Promise<void> {
    await db.execute(
      `
        UPDATE courses
        SET
          course_code = ?,
          course_name = ?,
          description = ?,
          credits = ?,
          session = ?
        WHERE id = ?
      `,
      [data.course_code, data.course_name, data.description, data.credits, data.session, id],
    );
  }

  async updateStatus(id: number, isActive: boolean): Promise<void> {
    await db.execute(
      `
        UPDATE courses
        SET is_active = ?
        WHERE id = ?
      `,
      [isActive, id],
    );
  }

  async getLecturers(courseId: number): Promise<DatabaseLecturer[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${COURSE_LECTURER_COLUMNS}
        FROM course_lecturers cl
        INNER JOIN users u
          ON u.id = cl.user_id
        WHERE cl.course_id = ?
        ORDER BY u.first_name ASC, u.last_name ASC
      `,
      [courseId],
    );

    return rows as DatabaseLecturer[];
  }

  async isLecturerAssigned(courseId: number, userId: number): Promise<boolean> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT 1
        FROM course_lecturers
        WHERE course_id = ?
          AND user_id = ?
        LIMIT 1
      `,
      [courseId, userId],
    );

    return rows.length > 0;
  }

  async assignLecturer(courseId: number, userId: number, role: CourseLecturerRole): Promise<void> {
    await db.execute(
      `
        INSERT INTO course_lecturers (
          course_id,
          user_id,
          role
        )
        VALUES (?, ?, ?)
      `,
      [courseId, userId, role],
    );
  }

  async removeLecturer(courseId: number, userId: number): Promise<void> {
    await db.execute(
      `
        DELETE FROM course_lecturers
        WHERE course_id = ?
          AND user_id = ?
      `,
      [courseId, userId],
    );
  }
}
