import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config/database";

import { ACTIVE_SESSION_CONDITION, ATTENDANCE_SESSION_COLUMNS } from "./session.constants";
import type {
  CreateAttendanceSessionData,
  DatabaseAttendanceSession,
  UpdateAttendanceSessionData,
} from "./session.types";

const DUPLICATE_ENTRY = "ER_DUP_ENTRY";

function isDuplicateEntryError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === DUPLICATE_ENTRY;
}

export class AttendanceSessionRepository {
  async findById(sessionId: number): Promise<DatabaseAttendanceSession | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${ATTENDANCE_SESSION_COLUMNS}
        FROM attendance_sessions
        WHERE id = ?
      `,
      [sessionId],
    );

    return (rows[0] as DatabaseAttendanceSession) ?? null;
  }

  async findActiveByCourse(courseOfferingId: number): Promise<DatabaseAttendanceSession | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${ATTENDANCE_SESSION_COLUMNS}
        FROM attendance_sessions
        WHERE course_offering_id = ?
          AND ${ACTIVE_SESSION_CONDITION}
        LIMIT 1
      `,
      [courseOfferingId],
    );

    return (rows[0] as DatabaseAttendanceSession) ?? null;
  }

  async create(data: CreateAttendanceSessionData): Promise<DatabaseAttendanceSession | null> {
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
        [data.course_offering_id],
      );

      const [activeRows] = await connection.execute<RowDataPacket[]>(
        `
          SELECT id
          FROM attendance_sessions
          WHERE course_offering_id = ?
            AND ${ACTIVE_SESSION_CONDITION}
          LIMIT 1
        `,
        [data.course_offering_id],
      );

      if (activeRows.length > 0) {
        await connection.rollback();
        return null;
      }

      const [result] = await connection.execute<ResultSetHeader>(
        `
          INSERT INTO attendance_sessions (
            course_offering_id,
            lecturer_id,
            week_number,
            class_type,
            session_start_at,
            session_end_at,
            latitude,
            longitude
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          data.course_offering_id,
          data.lecturer_id,
          data.week_number,
          data.class_type,
          data.session_start_at,
          data.session_end_at,
          data.latitude,
          data.longitude,
        ],
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

  async close(sessionId: number): Promise<boolean> {
    const [result] = await db.execute<ResultSetHeader>(
      `
        UPDATE attendance_sessions
        SET session_status = 'closed'
        WHERE id = ?
          AND session_status = 'open'
      `,
      [sessionId],
    );

    return result.affectedRows > 0;
  }

  async reopen(sessionId: number, courseOfferingId: number): Promise<DatabaseAttendanceSession | null> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      await connection.execute(
        `
          SELECT id
          FROM courses
          WHERE id = ?
          FOR UPDATE
        `,
        [courseOfferingId],
      );

      const [activeRows] = await connection.execute<RowDataPacket[]>(
        `
          SELECT id
          FROM attendance_sessions
          WHERE course_offering_id = ?
            AND id != ?
            AND ${ACTIVE_SESSION_CONDITION}
          LIMIT 1
        `,
        [courseOfferingId, sessionId],
      );

      if (activeRows.length > 0) {
        await connection.rollback();
        return null;
      }

      const [result] = await connection.execute<ResultSetHeader>(
        `
          UPDATE attendance_sessions
          SET session_status = 'open'
          WHERE id = ?
            AND session_status = 'closed'
        `,
        [sessionId],
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        return null;
      }

      const [rows] = await connection.execute<RowDataPacket[]>(
        `
          SELECT
            ${ATTENDANCE_SESSION_COLUMNS}
          FROM attendance_sessions
          WHERE id = ?
        `,
        [sessionId],
      );

      await connection.commit();

      return rows[0] as DatabaseAttendanceSession;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async update(sessionId: number, data: UpdateAttendanceSessionData): Promise<DatabaseAttendanceSession | null> {
    await db.execute(
      `
        UPDATE attendance_sessions
        SET
          week_number = ?,
          class_type = ?,
          session_start_at = ?,
          session_end_at = ?
        WHERE id = ?
      `,
      [data.week_number, data.class_type, data.session_start_at, data.session_end_at, sessionId],
    );

    return this.findById(sessionId);
  }
}
