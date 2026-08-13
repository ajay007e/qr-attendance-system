import { RowDataPacket } from "mysql2";

import { db } from "../../../../config/database";

import { CourseStudent, EnrolledCourse, Pagination } from "./enrolment.types";

// MySQL duplicate-key error code, raised when inserting a row that violates
// the (course_id, user_id) composite primary key.
const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

function isDuplicateEntryError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === DUPLICATE_ENTRY
  );
}

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
    search: string | undefined,
    pagination: Pagination,
  ): Promise<EnrolledCourse[]> {
    const params: (number | string)[] = [userId];

    let searchClause = "";

    if (search && search.trim()) {
      searchClause = "AND (c.course_code LIKE ? OR c.course_name LIKE ?)";

      const like = `%${search.trim()}%`;

      params.push(like, like);
    }

    const { limit, offset } = pagination;

    const [rows] = await db.query<RowDataPacket[]>(
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
            LIMIT ${limit}
            OFFSET ${offset}
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

  // Returns false when the (course_id, user_id) row already exists, relying on
  // the composite primary key instead of a separate existence query.
  async enrol(courseId: number, userId: number): Promise<boolean> {
    try {
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

      return true;
    } catch (error) {
      if (isDuplicateEntryError(error)) {
        return false;
      }

      throw error;
    }
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

  async getStudents(
    courseId: number,
    pagination: Pagination,
  ): Promise<CourseStudent[]> {
    const { limit, offset } = pagination;

    const [rows] = await db.query<RowDataPacket[]>(
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
            LIMIT ${limit}
            OFFSET ${offset}
            `,
      [courseId],
    );

    return rows as CourseStudent[];
  }
}
