import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config";
import type { PaginatedData } from "@/types";
import { DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, DEFAULT_PAGE } from "@/utils";

import type {
  DatabaseAssignedCourse,
  DatabaseEnrolledCourse,
  DatabaseStudent,
  EnrolmentQuery,
} from "./enrolment.types";

const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

function isDuplicateEntryError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === DUPLICATE_ENTRY;
}

export class EnrolmentRepository {
  /* =====================================================
   * Student Enrolment
   * ===================================================== */

  async findEnrolledCourses(userId: number): Promise<DatabaseEnrolledCourse[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          c.id,
          c.course_code,
          c.course_name,
          c.description,
          c.credits,
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

    return rows as DatabaseEnrolledCourse[];
  }

  async findAvailableCourses(userId: number, query: EnrolmentQuery): Promise<PaginatedData<DatabaseEnrolledCourse>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const offset = (page - 1) * limit;

    let where = `
    WHERE c.is_active = TRUE
      AND c.id NOT IN (
        SELECT course_id
        FROM course_enrolments
        WHERE user_id = ?
      )
  `;

    const params: ExecuteValues[] = [userId];

    if (query.search?.trim()) {
      where += `
      AND (
        c.course_code LIKE ?
        OR c.course_name LIKE ?
      )
    `;

      const keyword = `%${query.search.trim()}%`;

      params.push(keyword, keyword);
    }

    const [countRows] = await db.execute<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM courses c
      ${where}
    `,
      params,
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
        c.id,
        c.course_code,
        c.course_name,
        c.description,
        c.credits,
        c.is_active,
        NULL AS enrolled_at
      FROM courses c
      ${where}
      ORDER BY c.course_code ASC
      LIMIT ${limit}
      OFFSET ${offset}
    `,
      params,
    );

    return {
      items: rows as DatabaseEnrolledCourse[],
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
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
      await db.execute<ResultSetHeader>(
        `
          INSERT INTO course_enrolments (
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
        DELETE FROM course_enrolments
        WHERE course_id = ?
          AND user_id = ?
      `,
      [courseId, userId],
    );
  }

  /* =====================================================
   * Lecturer Courses
   * ===================================================== */

  async findAssignedCourses(userId: number): Promise<DatabaseAssignedCourse[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          c.id,
          c.course_code,
          c.course_name,
          c.description,
          c.credits,
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

    return rows as DatabaseAssignedCourse[];
  }

  /* =====================================================
   * Course Roster
   * ===================================================== */

  async getStudents(courseId: number, query: EnrolmentQuery): Promise<PaginatedData<DatabaseStudent>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
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

    const [countRows] = await db.execute<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM course_enrolments ce
      INNER JOIN users u
        ON u.id = ce.user_id
      ${where}
    `,
      params,
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

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
      ${where}
      ORDER BY u.first_name ASC, u.last_name ASC
      LIMIT ${limit}
      OFFSET ${offset}
    `,
      params,
    );

    return {
      items: rows as DatabaseStudent[],
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}
