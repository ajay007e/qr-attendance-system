import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config";

import type {
  CreateAttendanceRecordData,
  DatabaseAttendanceRecord,
  DatabaseSessionAttendance,
  DatabaseStudentAttendance,
  SessionAttendanceQuery,
  StudentAttendanceQuery,
} from "./attendance.types";

import type { PaginatedData } from "@/types";
import { AppError, DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, DEFAULT_PAGE, isDuplicateEntryError } from "@/utils";
import { ATTENDANCE_RECORD_COLUMNS } from "./attendance.constants";
import { decodeStudentAttendanceCursor, encodeStudentAttendanceCursor } from "./attendance.utils";

export class AttendanceRepository {
  async findById(id: number): Promise<DatabaseAttendanceRecord | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ${ATTENDANCE_RECORD_COLUMNS} FROM attendance_records WHERE id = ? LIMIT 1`,
      [id],
    );
    return (rows[0] as DatabaseAttendanceRecord) ?? null;
  }

  async findBySessionAndStudent(sessionId: number, studentId: number): Promise<DatabaseAttendanceRecord | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT ${ATTENDANCE_RECORD_COLUMNS} FROM attendance_records WHERE session_id = ? AND student_id = ? LIMIT 1`,
      [sessionId, studentId],
    );
    return (rows[0] as DatabaseAttendanceRecord) ?? null;
  }

  async create(data: CreateAttendanceRecordData): Promise<DatabaseAttendanceRecord> {
    try {
      const [result] = await db.execute<ResultSetHeader>(
        `INSERT INTO attendance_records (session_id, student_id, status, attendance_method, location_status) VALUES (?, ?, ?, ?, ?)`,
        [data.session_id, data.student_id, data.status, data.attendance_method, data.location_status],
      );
      const record = await this.findById(result.insertId);
      if (!record) {
        throw new Error("Attendance record was created but could not be retrieved");
      }
      return record;
    } catch (error) {
      if (isDuplicateEntryError(error)) {
        throw new AppError("You have already marked attendance for this session", 409);
      }
      throw error;
    }
  }

  async getSessionAttendance(
    sessionId: number,
    courseOfferingId: number,
    query: SessionAttendanceQuery,
  ): Promise<PaginatedData<DatabaseSessionAttendance>> {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const offset = (page - 1) * limit;

    let where = `WHERE ce.course_offering_id = ? AND ce.status <> 'withdrawn'`;
    const params: ExecuteValues[] = [courseOfferingId];

    if (query.search?.trim()) {
      where += ` AND (u.first_name LIKE ? OR u.last_name LIKE ? OR u.email LIKE ?)`;
      const keyword = `%${query.search.trim()}%`;
      params.push(keyword, keyword, keyword);
    }

    if (query.status === "absent") {
      where += ` AND ar.id IS NULL`;
    } else if (query.status) {
      where += ` AND ar.status = ?`;
      params.push(query.status);
    }

    if (query.attendanceMethod) {
      where += ` AND ar.attendance_method = ?`;
      params.push(query.attendanceMethod);
    }

    if (query.locationStatus) {
      where += ` AND ar.location_status = ?`;
      params.push(query.locationStatus);
    }

    const [countRows] = await db.execute<RowDataPacket[]>(
      `SELECT COUNT(*) AS total FROM course_enrolments ce INNER JOIN users u ON u.id = ce.user_id
        LEFT JOIN attendance_records ar ON ar.session_id = ? AND ar.student_id = ce.user_id ${where}`,
      [sessionId, ...params],
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT
        u.id AS student_id,
        u.first_name AS student_first_name,
        u.last_name AS student_last_name,
        u.email AS student_email,

        ar.id AS attendance_id,
        ar.session_id AS attendance_session_id,
        ar.student_id AS attendance_student_id,
        ar.status AS attendance_status,
        ar.attendance_method AS attendance_method,
        ar.location_status AS attendance_location_status,
        ar.marked_at AS attendance_marked_at,
        ar.marked_by AS attendance_marked_by,
        ar.lecturer_note AS attendance_lecturer_note,
        ar.created_at AS attendance_created_at,
        ar.updated_at AS attendance_updated_at

      FROM course_enrolments ce

      INNER JOIN users u ON u.id = ce.user_id

      LEFT JOIN attendance_records ar ON ar.session_id = ? AND ar.student_id = ce.user_id

      ${where}

      ORDER BY u.first_name ASC, u.last_name ASC

      LIMIT ${limit}
      OFFSET ${offset}
    `,
      [sessionId, ...params],
    );

    return {
      items: rows as DatabaseSessionAttendance[],
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasData: true,
      },
    };
  }

  async getStudentAttendance(
    studentId: number,
    courseOfferingId: number,
    query: StudentAttendanceQuery,
  ): Promise<{
    items: DatabaseStudentAttendance[];
    nextCursor: string | null;
    hasMore: boolean;
  }> {
    const limit = Math.min(DEFAULT_MAX_LIMIT, Math.max(1, query.limit ?? DEFAULT_LIMIT));
    const params: ExecuteValues[] = [studentId, courseOfferingId];

    let sessionWhere = `
    WHERE ats.course_offering_id = ?
  `;

    if (query.classType) {
      sessionWhere += ` AND ats.class_type = ?`;
      params.push(query.classType);
    }

    let finalWhere = `WHERE 1 = 1`;

    if (query.status === "present") {
      finalWhere += ` AND attendance_id IS NOT NULL`;
    }

    if (query.status === "absent") {
      finalWhere += ` AND attendance_id IS NULL`;
    }

    if (query.cursor) {
      const cursor = decodeStudentAttendanceCursor(query.cursor);

      finalWhere += `
      AND (
        week_number < ?

        OR (
          week_number = ?
          AND class_type > ?
        )

        OR (
          week_number = ?
          AND class_type = ?
          AND class_number < ?
        )

        OR (
          week_number = ?
          AND class_type = ?
          AND class_number = ?
          AND session_start_at < ?
        )

        OR (
          week_number = ?
          AND class_type = ?
          AND class_number = ?
          AND session_start_at = ?
          AND session_id < ?
        )
      )
    `;

      params.push(
        cursor.weekNumber,

        cursor.weekNumber,
        cursor.classType,

        cursor.weekNumber,
        cursor.classType,
        cursor.classNumber,

        cursor.weekNumber,
        cursor.classType,
        cursor.classNumber,
        new Date(cursor.sessionStartAt),

        cursor.weekNumber,
        cursor.classType,
        cursor.classNumber,
        new Date(cursor.sessionStartAt),
        cursor.sessionId,
      );
    }

    const sql = `
    WITH session_data AS (
      SELECT
        ats.id AS session_id,
        ats.course_offering_id,
        ats.week_number,
        ats.class_number,
        ats.class_type,
        ats.title,
        ats.session_start_at,

        ar.id AS attendance_id,
        ar.status AS attendance_status,
        ar.attendance_method,
        ar.location_status,
        ar.marked_at,
        ar.lecturer_note,

        u.first_name AS marked_by_first_name,
        u.last_name AS marked_by_last_name,

        COUNT(ar.id) OVER (
          PARTITION BY
            ats.week_number,
            ats.class_type,
            ats.class_number
        ) AS attendance_count,

        ROW_NUMBER() OVER (
          PARTITION BY
            ats.week_number,
            ats.class_type,
            ats.class_number
          ORDER BY
            ats.session_start_at ASC,
            ats.id ASC
        ) AS session_rank

      FROM attendance_sessions ats

      LEFT JOIN attendance_records ar
        ON ar.session_id = ats.id
        AND ar.student_id = ?

      LEFT JOIN users u
        ON u.id = ar.marked_by

      ${sessionWhere}
    ),

    final_attendance AS (
      SELECT
        session_id AS result_id,

        week_number,
        class_number,
        class_type,

        session_id,
        session_start_at,
        title,

        attendance_id,
        attendance_status,
        attendance_method,
        location_status,
        marked_at AS attendance_marked_at,
        lecturer_note AS attendance_lecturer_note,

        marked_by_first_name,
        marked_by_last_name

      FROM session_data

      WHERE attendance_count > 0
        AND attendance_id IS NOT NULL

      UNION ALL

      SELECT
        session_id AS result_id,

        week_number,
        class_number,
        class_type,

        session_id,
        session_start_at,
        title,

        NULL AS attendance_id,
        NULL AS attendance_status,
        NULL AS attendance_method,
        NULL AS location_status,
        NULL AS attendance_marked_at,
        NULL AS attendance_lecturer_note,

        NULL AS marked_by_first_name,
        NULL AS marked_by_last_name

      FROM session_data

      WHERE attendance_count = 0
        AND session_rank = 1
    )

    SELECT
      result_id,

      week_number,
      class_number,
      class_type,

      session_id,
      session_start_at,
      title,

      attendance_id,
      attendance_status,
      attendance_method,
      location_status,
      attendance_marked_at,
      attendance_lecturer_note,

      marked_by_first_name,
      marked_by_last_name,

      CASE
        WHEN attendance_id IS NULL THEN 0
        ELSE 1
      END AS attendance_exists

    FROM final_attendance

    ${finalWhere}

    ORDER BY
      week_number DESC,
      class_type ASC,
      class_number ASC,
      session_start_at DESC,
      session_id DESC

    LIMIT ${limit + 1}
  `;

    const [rows] = await db.execute<RowDataPacket[]>(sql, params);

    const typedRows = rows as DatabaseStudentAttendance[];

    const hasMore = typedRows.length > limit;

    const items = hasMore ? typedRows.slice(0, limit) : typedRows;

    let nextCursor: string | null = null;

    if (hasMore && items.length > 0) {
      const last = items[items.length - 1];

      nextCursor = encodeStudentAttendanceCursor({
        weekNumber: last.week_number,
        classType: last.class_type,
        classNumber: last.class_number,
        sessionStartAt: last.session_start_at.toISOString(),
        sessionId: last.session_id,
      });
    }

    return {
      items,
      nextCursor,
      hasMore,
    };
  }
}
