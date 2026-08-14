import { ResultSetHeader, RowDataPacket, ExecuteValues } from "mysql2";

import { db } from "../../../../config/database";

import {
  Course,
  CourseLecturer,
  CreateCourseRequest,
  PaginatedCourses,
  UpdateCourseRequest,
  CourseQuery,
  CourseLecturerRole,
} from "./course.types";

export class CourseRepository {
  /* =====================================================
   * Course CRUD
   * ===================================================== */

  async findAll(query: CourseQuery): Promise<PaginatedCourses> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 10));
    const offset = (page - 1) * limit;

    let where = `WHERE 1 = 1`;

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
      where += ` AND session = ?`;

      params.push(query.session);
    }

    if (query.status) {
      where += ` AND is_active = ?`;

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

    const total = Number(countRows[0].total);

    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT
        id,
        course_code,
        course_name,
        description,
        credits,
        session,
        is_active,
        created_at,
        updated_at
      FROM courses
      ${where}
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
      `,
      params,
    );

    return {
      data: rows as Course[],

      pagination: {
        page,
        limit,
        count: rows.length,
        total,
        totalPages: Math.ceil(total / limit),
        hasPrevious: page > 1,
        hasNext: page < Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number): Promise<Course | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
        id,
        course_code,
        course_name,
        description,
        credits,
        session,
        is_active,
        created_at,
        updated_at
      FROM courses
      WHERE id = ?
      LIMIT 1
      `,
      [id],
    );

    return (rows[0] as Course) ?? null;
  }

  async findByCode(courseCode: string): Promise<Course | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
        id,
        course_code,
        course_name,
        description,
        credits,
        session,
        is_active,
        created_at,
        updated_at
      FROM courses
      WHERE course_code = ?
      LIMIT 1
      `,
      [courseCode],
    );

    return (rows[0] as Course) ?? null;
  }

  async create(data: CreateCourseRequest): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
      INSERT INTO courses
      (
        course_code,
        course_name,
        description,
        credits,
        session
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [data.courseCode, data.courseName, data.description ?? null, data.credits, data.session],
    );

    return result.insertId;
  }

  async update(id: number, data: UpdateCourseRequest): Promise<void> {
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
      [data.courseCode, data.courseName, data.description ?? null, data.credits, data.session, id],
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

  /* =====================================================
   * Lecturer Assignment
   * ===================================================== */

  async getLecturers(courseId: number): Promise<CourseLecturer[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        cl.role,
        cl.created_at
      FROM course_lecturers cl
      INNER JOIN users u
        ON u.id = cl.user_id
      WHERE cl.course_id = ?
      ORDER BY u.first_name, u.last_name
      `,
      [courseId],
    );

    return rows as CourseLecturer[];
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
      INSERT INTO course_lecturers
      (
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
      DELETE
      FROM course_lecturers
      WHERE course_id = ?
      AND user_id = ?
      `,
      [courseId, userId],
    );
  }
}
