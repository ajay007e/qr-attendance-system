import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config/database";
import type { PaginatedData } from "@/types";
import { DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, DEFAULT_PAGE } from "@/utils";
import { COURSE_LECTURER_COLUMNS } from "./offering.constants";

import type {
  CourseLecturerRole,
  CourseOfferingQuery,
  CreateCourseOfferingData,
  DatabaseCourseOffering,
  DatabaseCourseOfferingListItem,
  DatabaseLecturer,
  UpdateCourseOfferingData,
} from "./offering.types";

export class OfferingRepository {
  async findAll(query: CourseOfferingQuery): Promise<PaginatedData<DatabaseCourseOfferingListItem>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const offset = (page - 1) * limit;

    let where = "WHERE 1 = 1";
    const params: ExecuteValues[] = [];

    if (query.search) {
      where += `
      AND (
        c.course_code LIKE ?
        OR c.course_name LIKE ?
      )
    `;

      const keyword = `%${query.search}%`;

      params.push(keyword, keyword);
    }

    if (query.session) {
      where += " AND co.session = ?";
      params.push(query.session);
    }

    if (query.status) {
      where += " AND co.status = ?";
      params.push(query.status);
    }

    // Total records matching the current filters
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

    // Total records without filters, used for hasData
    const [dataCountRows] = await db.execute<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM course_offerings
    `,
    );

    const dataCount = Number(dataCountRows[0]?.total ?? 0);

    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
        co.id,
        co.course_id,
        c.course_code,
        c.course_name,
        co.academic_year,
        co.session,
        co.start_date,
        co.end_date,
        co.status,
        co.created_at,
        co.updated_at
      FROM course_offerings co
      INNER JOIN courses c
        ON c.id = co.course_id
      ${where}
      ORDER BY co.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `,
      params,
    );

    return {
      items: rows as DatabaseCourseOfferingListItem[],
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasData: dataCount > 0,
      },
    };
  }

  async findById(id: number): Promise<DatabaseCourseOffering | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          co.id,
          co.course_id,
          co.academic_year,
          co.session,
          co.start_date,
          co.end_date,
          co.status,
          co.created_at,
          co.updated_at
        FROM course_offerings co
        WHERE co.id = ?
        LIMIT 1
      `,
      [id],
    );

    return (rows[0] as DatabaseCourseOffering) ?? null;
  }

  async findByCourseYearSession(
    courseId: number,
    academicYear: number,
    session: string,
  ): Promise<DatabaseCourseOffering | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          co.id,
          co.course_id,
          co.academic_year,
          co.session,
          co.start_date,
          co.end_date,
          co.status,
          co.created_at,
          co.updated_at
        FROM course_offerings co
        WHERE co.course_id = ?
          AND co.academic_year = ?
          AND co.session = ?
        LIMIT 1
      `,
      [courseId, academicYear, session],
    );

    return (rows[0] as DatabaseCourseOffering) ?? null;
  }

  async create(data: CreateCourseOfferingData): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
        INSERT INTO course_offerings (
          course_id,
          academic_year,
          session,
          start_date,
          end_date,
          status
        )
        VALUES (?, ?, ?, ?, ?, 'enrol')
      `,
      [data.course_id, data.academic_year, data.session, data.start_date, data.end_date],
    );

    return result.insertId;
  }

  async update(id: number, data: UpdateCourseOfferingData): Promise<void> {
    const fields: string[] = [];
    const params: ExecuteValues[] = [];

    if (data.course_id !== undefined) {
      fields.push("course_id = ?");
      params.push(data.course_id);
    }

    if (data.academic_year !== undefined) {
      fields.push("academic_year = ?");
      params.push(data.academic_year);
    }

    if (data.session !== undefined) {
      fields.push("session = ?");
      params.push(data.session);
    }

    if (data.start_date !== undefined) {
      fields.push("start_date = ?");
      params.push(data.start_date);
    }

    if (data.end_date !== undefined) {
      fields.push("end_date = ?");
      params.push(data.end_date);
    }

    if (data.status !== undefined) {
      fields.push("status = ?");
      params.push(data.status);
    }

    if (fields.length === 0) {
      return;
    }

    params.push(id);

    await db.execute(
      `
      UPDATE course_offerings
      SET ${fields.join(", ")}
      WHERE id = ?
    `,
      params,
    );
  }

  async getLecturers(offeringId: number): Promise<DatabaseLecturer[]> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
        ${COURSE_LECTURER_COLUMNS}
      FROM course_lecturers cl
      INNER JOIN users u
        ON u.id = cl.user_id
      WHERE cl.course_offering_id = ?
      ORDER BY u.first_name ASC, u.last_name ASC
    `,
      [offeringId],
    );

    return rows as DatabaseLecturer[];
  }

  async isLecturerAssigned(offeringId: number, userId: number): Promise<boolean> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT 1
      FROM course_lecturers
      WHERE course_offering_id = ?
        AND user_id = ?
      LIMIT 1
    `,
      [offeringId, userId],
    );

    return rows.length > 0;
  }

  async assignLecturer(offeringId: number, userId: number, role: CourseLecturerRole): Promise<void> {
    await db.execute(
      `
      INSERT INTO course_lecturers (
        course_offering_id,
        user_id,
        role
      )
      VALUES (?, ?, ?)
    `,
      [offeringId, userId, role],
    );
  }

  async removeLecturer(offeringId: number, userId: number): Promise<void> {
    await db.execute(
      `
      DELETE FROM course_lecturers
      WHERE course_offering_id = ?
        AND user_id = ?
    `,
      [offeringId, userId],
    );
  }
}
