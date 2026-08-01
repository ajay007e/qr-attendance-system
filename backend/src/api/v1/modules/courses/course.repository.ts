import { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "../../../../config/database";

import {
  Course,
  CreateCourseRequest,
  UpdateCourseRequest,
} from "./course.types";

export class CourseRepository {
  /* =====================================================
   * Course CRUD
   * ===================================================== */

  async findAll(): Promise<Course[]> {
    const [rows] = await db.execute<RowDataPacket[]>(`
            SELECT
                id,
                course_code,
                course_name,
                description,
                semester,
                year,
                is_active,
                created_at,
                updated_at
            FROM courses
            ORDER BY year DESC,
                     semester DESC,
                     course_code ASC
        `);

    return rows as Course[];
  }

  async findById(id: number): Promise<Course | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT
                id,
                course_code,
                course_name,
                description,
                semester,
                year,
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
                semester,
                year,
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
                    semester,
                    year
                )
                VALUES (?, ?, ?, ?, ?)
                `,
      [
        data.courseCode,
        data.courseName,
        data.description ?? null,
        data.semester,
        data.year,
      ],
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
                semester = ?,
                year = ?
            WHERE id = ?
            `,
      [
        data.courseCode,
        data.courseName,
        data.description ?? null,
        data.semester,
        data.year,
        id,
      ],
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

  async getLecturers(courseId: number) {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT
                u.id,
                u.first_name,
                u.last_name,
                u.email,
                u.role,
                cl.created_at
            FROM course_lecturers cl
            INNER JOIN users u
                ON u.id = cl.user_id
            WHERE cl.course_id = ?
            ORDER BY u.first_name
            `,
      [courseId],
    );

    return rows;
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

  async assignLecturer(courseId: number, userId: number): Promise<void> {
    await db.execute(
      `
            INSERT INTO course_lecturers
            (
                course_id,
                user_id
            )
            VALUES (?, ?)
            `,
      [courseId, userId],
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
