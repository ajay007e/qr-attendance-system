import { ExecuteValues, RowDataPacket } from "mysql2";

import { db } from "../../../../config/database";

import { AssignedCourse, CourseStudent, EnrolledCourse, Pagination } from "./enrolment.types";
import { ParticipantQuery } from "../courses/course.types";
import { PaginatedUsers, User } from "../users/user.types";

// MySQL duplicate-key error code, raised when inserting a row that violates
// the (course_id, user_id) composite primary key.
const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

function isDuplicateEntryError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === DUPLICATE_ENTRY;
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

  /* =====================================================
   * Lecturer Courses
   * ===================================================== */

  async findAssignedCourses(userId: number): Promise<AssignedCourse[]> {
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
                cl.role AS lecturer_role,
                cl.created_at AS assigned_at
            FROM course_lecturers cl
            INNER JOIN courses c
                ON c.id = cl.course_id
            WHERE cl.user_id = ?
            ORDER BY c.course_code ASC
            `,
      [userId],
    );

    return rows as AssignedCourse[];
  }

  /* =====================================================
   * Course Roster
   * ===================================================== */

  async getStudents(courseId: number, query: ParticipantQuery): Promise<PaginatedUsers> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;

    let where = `
    WHERE ce.course_id = ?
  `;

    const params: ExecuteValues[] = [courseId];

    if (query.search?.trim()) {
      where += `
      AND (
        u.first_name LIKE ?
        OR u.last_name LIKE ?
        OR u.email LIKE ?
      )
    `;

      const keyword = `%${query.search.trim()}%`;

      params.push(keyword, keyword, keyword);
    }

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
      ${where}
      ORDER BY u.first_name
      LIMIT ?
      OFFSET ?
    `,
      [...params, limit, offset],
    );

    const [countRows] = await db.query<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM course_enrolments ce
      INNER JOIN users u
          ON u.id = ce.user_id
      ${where}
    `,
      params,
    );

    const total = Number(countRows[0].total);
    const totalPages = Math.ceil(total / limit);

    return {
      data: rows as User[],
      pagination: {
        page,
        limit,
        count: rows.length,
        total,
        totalPages,
        hasPrevious: page > 1,
        hasNext: page < totalPages,
      },
    };
  }
}
