import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config/database";

import { ATTENDANCE_SESSION_COLUMNS } from "./attendance-session.constants";
import type { DatabaseAttendanceSession, StartAttendanceSessionData } from "./attendance-session.types";

const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

function isDuplicateEntryError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === DUPLICATE_ENTRY;
}

export class AttendanceSessionRepository {
  async findActiveByCourse(courseId: number): Promise<DatabaseAttendanceSession | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${ATTENDANCE_SESSION_COLUMNS}
        FROM attendance_sessions
        WHERE course_id = ?
          AND status = 'ACTIVE'
        LIMIT 1
      `,
      [courseId],
    );

    return (rows[0] as DatabaseAttendanceSession) ?? null;
  }

  async start(data: StartAttendanceSessionData): Promise<DatabaseAttendanceSession | null> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      // Lock the course row so concurrent "start session" requests for the
      // same course are serialised, closing the check-then-insert race window.
      await connection.execute(
        `
          SELECT id
          FROM courses
          WHERE id = ?
          FOR UPDATE
        `,
        [data.course_id],
      );

      const [activeRows] = await connection.execute<RowDataPacket[]>(
        `
          SELECT id
          FROM attendance_sessions
          WHERE course_id = ?
            AND status = 'ACTIVE'
          LIMIT 1
        `,
        [data.course_id],
      );

      if (activeRows.length > 0) {
        await connection.rollback();
        return null;
      }

      const [result] = await connection.execute<ResultSetHeader>(
        `
          INSERT INTO attendance_sessions (
            course_id,
            lecturer_id,
            duration_minutes
          )
          VALUES (?, ?, ?)
        `,
        [data.course_id, data.lecturer_id, data.duration_minutes],
      );

      const [rows] = await connection.execute<RowDataPacket[]>(
        `
          SELECT
            ${ATTENDANCE_SESSION_COLUMNS}
          FROM attendance_sessions
          WHERE id = ?
        `,
        [result.insertId],
      );

      await connection.commit();

      return rows[0] as DatabaseAttendanceSession;
    } catch (error) {
      await connection.rollback();

      if (isDuplicateEntryError(error)) {
        return null;
      }

      throw error;
    } finally {
      connection.release();
    }
  }
}