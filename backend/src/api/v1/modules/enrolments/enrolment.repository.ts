import { RowDataPacket } from "mysql2";

import { db } from "../../../../config/database";

import { CourseStudent, EnrolledCourse } from "./enrolment.types";

export class EnrolmentRepository {
  /* =====================================================
   * Student Enrolment
   * ===================================================== */

  async findEnrolledCourses(userId: number): Promise<EnrolledCourse[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT
                c.id,
                c.course_code,
                c.course_name,
                c.description,
                c.credits,
                c.session,
                c.is_active,
                ce.created_at AS enrolled_at
            FROM course_enrolments ce
            INNER JOIN courses c
                ON c.id = ce.course_id
            WHERE ce.user_id = ?
            ORDER BY c.course_code ASC
            `,
      [userId],
    );

    return rows as EnrolledCourse[];
  }

  async findAvailableCourses(
    userId: number,
    search?: string,
  ): Promise<EnrolledCourse[]> {
    const params: (number | string)[] = [userId];

    let searchClause = "";

    if (search && search.trim()) {
      searchClause = "AND (c.course_code LIKE ? OR c.course_name LIKE ?)";

      const like = `%${search.trim()}%`;

      params.push(like, like);
    }

    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT
                c.id,
                c.course_code,
                c.course_name,
                c.description,
                c.credits,
                c.session,
                c.is_active,
                NULL AS enrolled_at
            FROM courses c
            WHERE c.is_active = TRUE
            AND c.id NOT IN (
                SELECT course_id
                FROM course_enrolments
                WHERE user_id = ?
            )
            ${searchClause}
            ORDER BY c.course_code ASC
            `,
      params,
    );

    return rows as EnrolledCourse[];
  }

  async isEnrolled(courseId: number, userId: number): Promise<boolean> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT 1
            FROM course_enrolments
            WHERE course_id = ?
            AND user_id = ?
            LIMIT 1
            `,
      [courseId, userId],
    );

    return rows.length > 0;
  }

  async enrol(courseId: number, userId: number): Promise<void> {
    await db.execute(
      `
            INSERT INTO course_enrolments
            (
                course_id,
                user_id
            )
            VALUES (?, ?)
            `,
      [courseId, userId],
    );
  }

  async unenrol(courseId: number, userId: number): Promise<void> {
    await db.execute(
      `
            DELETE
            FROM course_enrolments
            WHERE course_id = ?
            AND user_id = ?
            `,
      [courseId, userId],
    );
  }

  async getStudents(courseId: number): Promise<CourseStudent[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT
                u.id,
                u.first_name,
                u.last_name,
                u.email,
                u.role,
                ce.created_at AS enrolled_at
            FROM course_enrolments ce
            INNER JOIN users u
                ON u.id = ce.user_id
            WHERE ce.course_id = ?
            ORDER BY u.first_name
            `,
      [courseId],
    );

    return rows as CourseStudent[];
  }
}
