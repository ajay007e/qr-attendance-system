import type { RowDataPacket } from "mysql2";

import { db } from "@/config/database";

import { ATTENDED_STATUSES } from "./summary.constants";
import type { DatabaseStudentAttendanceRow } from "./summary.types";

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

  async getStudentAttendanceRows(courseOfferingId: number): Promise<DatabaseStudentAttendanceRow[]> {
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

        WHERE ce.course_offering_id = ?
          AND ce.status <> 'withdrawn'

        GROUP BY u.id, u.first_name, u.last_name

        ORDER BY u.first_name ASC, u.last_name ASC
      `,
      [...ATTENDED_STATUSES, courseOfferingId],
    );

    return rows as DatabaseStudentAttendanceRow[];
  }
}