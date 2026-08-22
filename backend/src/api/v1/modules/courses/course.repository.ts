import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config/database";
import type { PaginatedData } from "@/types";

import { COURSE_COLUMNS } from "./course.constants";

import type { CourseQuery, CreateCourseData, DatabaseCourse, UpdateCourseData } from "./course.types";
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

    if (query.status) {
      where += " AND is_active = ?";
      params.push(query.status === "ACTIVE");
    }

    // Total matching the current filters
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

    const [dataCountRows] = await db.execute<RowDataPacket[]>(
      `
    SELECT COUNT(*) AS total
    FROM courses
  `,
    );

    const dataCount = Number(dataCountRows[0]?.total ?? 0);
    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
        ${COURSE_COLUMNS}
      FROM courses
      ${where}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `,
      params,
    );

    return {
      items: rows as DatabaseCourse[],
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasData: dataCount > 0,
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
          credits
        )
        VALUES (?, ?, ?, ?)
      `,
      [data.course_code, data.course_name, data.description, data.credits],
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
          credits = ?
        WHERE id = ?
      `,
      [data.course_code, data.course_name, data.description, data.credits, id],
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
}
