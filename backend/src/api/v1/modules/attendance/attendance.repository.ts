import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config";

import type {
  CreateAttendanceRecordData,
  DatabaseAttendanceRecord,
  DatabaseSessionAttendance,
  SessionAttendanceQuery,
} from "./attendance.types";

import type { PaginatedData } from "@/types";
import { AppError, DEFAULT_LIMIT, DEFAULT_MAX_LIMIT, DEFAULT_PAGE, isDuplicateEntryError } from "@/utils";
import { ATTENDANCE_RECORD_COLUMNS } from "./attendance.constants";

export class AttendanceRepository {
  async findById(id: number): Promise<DatabaseAttendanceRecord | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${ATTENDANCE_RECORD_COLUMNS}
        FROM attendance_records
        WHERE id = ?
        LIMIT 1
      `,
      [id],
    );

    return (rows[0] as DatabaseAttendanceRecord) ?? null;
  }

  async findBySessionAndStudent(sessionId: number, studentId: number): Promise<DatabaseAttendanceRecord | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${ATTENDANCE_RECORD_COLUMNS}
        FROM attendance_records
        WHERE session_id = ?
          AND student_id = ?
        LIMIT 1
      `,
      [sessionId, studentId],
    );

    return (rows[0] as DatabaseAttendanceRecord) ?? null;
  }

  async create(data: CreateAttendanceRecordData): Promise<DatabaseAttendanceRecord> {
    try {
      const [result] = await db.execute<ResultSetHeader>(
        `
          INSERT INTO attendance_records (
            session_id,
            student_id,
            status,
            attendance_method,
            location_status
          )
          VALUES (?, ?, ?, ?, ?)
        `,
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

    let where = `
    WHERE ce.course_offering_id = ?
      AND ce.status <> 'withdrawn'
  `;

    const params: ExecuteValues[] = [courseOfferingId];

    // Search student
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

    // Attendance status
    if (query.status === "absent") {
      where += `
      AND ar.id IS NULL
    `;
    } else if (query.status) {
      where += `
      AND ar.status = ?
    `;

      params.push(query.status);
    }

    // Attendance method
    if (query.attendanceMethod) {
      where += `
      AND ar.attendance_method = ?
    `;

      params.push(query.attendanceMethod);
    }

    // Location status
    if (query.locationStatus) {
      where += `
      AND ar.location_status = ?
    `;

      params.push(query.locationStatus);
    }

    // Count
    const [countRows] = await db.execute<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total

      FROM course_enrolments ce

      INNER JOIN users u
        ON u.id = ce.user_id

      LEFT JOIN attendance_records ar
        ON ar.session_id = ?
        AND ar.student_id = ce.user_id

      ${where}
    `,
      [sessionId, ...params],
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

    // Data
    const [rows] = await db.execute<RowDataPacket[]>(
      `
      SELECT
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

      INNER JOIN users u
        ON u.id = ce.user_id

      LEFT JOIN attendance_records ar
        ON ar.session_id = ?
        AND ar.student_id = ce.user_id

      ${where}

      ORDER BY
        u.first_name ASC,
        u.last_name ASC

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
      },
    };
  }
}
