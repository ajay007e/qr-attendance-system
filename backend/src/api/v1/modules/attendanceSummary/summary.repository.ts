import type { RowDataPacket } from "mysql2";

import { db } from "@/config/database";
import type { PaginatedData } from "@/types";
import { DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, DEFAULT_PAGE } from "@/utils/constants/pagination.constants";

import { ATTENDED_STATUSES } from "./summary.constants";
import type { DatabaseStudentAttendanceRow, SummaryQuery } from "./summary.types";

export class AttendanceSummaryRepository {
  async countEndedSessions(courseOfferingId: number): Promise<number> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT COUNT(*) AS total
        FROM attendance_sessions
        WHERE course_offering_id = ?
          AND session_end_at <= NOW()
      `,
      [courseOfferingId],
    );

    return Number(rows[0]?.total ?? 0);
  }

  async getStudentAttendanceRows(
    courseOfferingId: number,
    query: SummaryQuery,
  ): Promise<PaginatedData<DatabaseStudentAttendanceRow>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const offset = (page - 1) * limit;

    const baseWhere = `
      WHERE ce.course_offering_id = ?
        AND ce.status <> 'withdrawn'
    `;

    let where = baseWhere;
    const params: (string | number)[] = [courseOfferingId];

    if (query.search?.trim()) {
      where += `
        AND (
          u.first_name LIKE ?
          OR u.last_name LIKE ?
        )
      `;

      const keyword = `%${query.search.trim()}%`;
      params.push(keyword, keyword);
    }

    // Filtered total (matches the search)
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

    // Unfiltered total (tells us if the course has any students at all)
    const [dataCountRows] = await db.execute<RowDataPacket[]>(
      `
        SELECT COUNT(*) AS total
        FROM course_enrolments ce
        ${baseWhere}
      `,
      [courseOfferingId],
    );

    const dataCount = Number(dataCountRows[0]?.total ?? 0);

    const placeholders = ATTENDED_STATUSES.map(() => "?").join(", ");

    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          u.id AS student_id,
          u.first_name,
          u.last_name,
          COUNT(DISTINCT CASE WHEN ar.status IN (${placeholders}) THEN ar.session_id END) AS attended_sessions

        FROM course_enrolments ce

        INNER JOIN users u
          ON u.id = ce.user_id

        LEFT JOIN attendance_sessions s
          ON s.course_offering_id = ce.course_offering_id
          AND s.session_end_at <= NOW()

        LEFT JOIN attendance_records ar
          ON ar.session_id = s.id
          AND ar.student_id = u.id

        ${where}

        GROUP BY u.id, u.first_name, u.last_name

        ORDER BY u.first_name ASC, u.last_name ASC

        LIMIT ${limit}
        OFFSET ${offset}
      `,
      [...ATTENDED_STATUSES, ...params],
    );

    return {
      items: rows as DatabaseStudentAttendanceRow[],
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasData: dataCount > 0,
      },
    };
  }
}