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
          co.id AS course_offering_id,

          c.id AS course_id,
          c.course_code,
          c.course_name,
          c.description,
          c.credits,
          c.is_active,

          co.academic_year,
          co.session,
          co.status AS offering_status,

          ce.status AS enrolment_status,
          ce.created_at AS enrolled_at

        FROM course_enrolments ce

        INNER JOIN course_offerings co
          ON co.id = ce.course_offering_id

        INNER JOIN courses c
          ON c.id = co.course_id

        WHERE ce.user_id = ?

        ORDER BY
          co.academic_year DESC,
          co.session ASC,
          c.course_code ASC
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
        AND co.status = 'enrol'
        AND NOT EXISTS (
          SELECT 1
          FROM course_enrolments ce_existing
          WHERE ce_existing.course_offering_id = co.id
            AND ce_existing.user_id = ?
            AND ce_existing.status <> 'withdrawn'
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

        FROM course_offerings co

        INNER JOIN courses c
          ON c.id = co.course_id

        ${where}
      `,
      params,
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          co.id AS course_offering_id,

          c.id AS course_id,
          c.course_code,
          c.course_name,
          c.description,
          c.credits,
          c.is_active,

          co.academic_year,
          co.session,
          co.status AS offering_status,

          NULL AS enrolment_status,
          NULL AS enrolled_at

        FROM course_offerings co

        INNER JOIN courses c
          ON c.id = co.course_id

        ${where}

        ORDER BY
          co.academic_year DESC,
          co.session ASC,
          c.course_code ASC

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

  async isEnrolled(courseOfferingId: number, userId: number): Promise<boolean> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT 1
        FROM course_enrolments
        WHERE course_offering_id = ?
          AND user_id = ?
          AND status <> 'withdrawn'
        LIMIT 1
      `,
      [courseOfferingId, userId],
    );

    return rows.length > 0;
  }

  async enrol(courseOfferingId: number, userId: number): Promise<boolean> {
    try {
      /*
       * A withdrawn enrolment already exists because the table
       * has a composite primary key:
       *
       * course_offering_id + user_id
       *
       * Therefore we restore the existing enrolment instead
       * of inserting another row.
       */

      const [result] = await db.execute<ResultSetHeader>(
        `
          UPDATE course_enrolments
          SET status = 'enrolled'
          WHERE course_offering_id = ?
            AND user_id = ?
            AND status = 'withdrawn'
        `,
        [courseOfferingId, userId],
      );

      if (result.affectedRows > 0) {
        return true;
      }

      await db.execute<ResultSetHeader>(
        `
          INSERT INTO course_enrolments (
            course_offering_id,
            user_id,
            status
          )
          VALUES (?, ?, 'enrolled')
        `,
        [courseOfferingId, userId],
      );

      return true;
    } catch (error) {
      if (isDuplicateEntryError(error)) {
        return false;
      }

      throw error;
    }
  }

  async unenrol(courseOfferingId: number, userId: number): Promise<void> {
    await db.execute(
      `
        UPDATE course_enrolments
        SET status = 'withdrawn'
        WHERE course_offering_id = ?
          AND user_id = ?
          AND status <> 'withdrawn'
      `,
      [courseOfferingId, userId],
    );
  }

  /* =====================================================
   * Lecturer Course Offerings
   * ===================================================== */

  async findAssignedCourses(userId: number): Promise<DatabaseAssignedCourse[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          co.id AS course_offering_id,

          c.id AS course_id,
          c.course_code,
          c.course_name,
          c.description,
          c.credits,
          c.is_active,

          co.academic_year,
          co.session,
          co.status AS offering_status,

          cl.role AS lecturer_role,
          cl.created_at AS assigned_at

        FROM course_lecturers cl

        INNER JOIN course_offerings co
          ON co.id = cl.course_offering_id

        INNER JOIN courses c
          ON c.id = co.course_id

        WHERE cl.user_id = ?

        ORDER BY
          co.academic_year DESC,
          co.session ASC,
          c.course_code ASC
      `,
      [userId],
    );

    return rows as DatabaseAssignedCourse[];
  }

  /* =====================================================
   * Course Offering Roster
   * ===================================================== */

  async getStudents(courseOfferingId: number, query: EnrolmentQuery): Promise<PaginatedData<DatabaseStudent>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);

    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));

    const offset = (page - 1) * limit;

    let where = `
      WHERE ce.course_offering_id = ?
        AND ce.status <> 'withdrawn'
    `;

    const params: ExecuteValues[] = [courseOfferingId];

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

          ce.status AS enrolment_status,
          ce.created_at AS enrolled_at

        FROM course_enrolments ce

        INNER JOIN users u
          ON u.id = ce.user_id

        ${where}

        ORDER BY
          u.first_name ASC,
          u.last_name ASC

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
