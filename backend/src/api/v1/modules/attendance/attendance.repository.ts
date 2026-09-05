import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config";

import type { CreateAttendanceRecordData, DatabaseAttendanceRecord } from "./attendance.types";
import { AppError, isDuplicateEntryError } from "@/utils";

const ATTENDANCE_RECORD_COLUMNS = `
  id,
  attendance_session_id,
  student_id,
  status,
  attendance_method,
  location_status,
  marked_at,
  marked_by,
  lecturer_note,
  created_at,
  updated_at
`;

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
        WHERE attendance_session_id = ?
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
            attendance_session_id,
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
}
