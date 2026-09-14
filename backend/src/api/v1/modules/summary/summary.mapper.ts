import { PERCENTAGE_DECIMAL_PLACES } from "./summary.constants";
import type { DatabaseStudentAttendanceRow, StudentAttendanceSummary } from "./summary.types";

export function toStudentAttendanceSummary(
  row: DatabaseStudentAttendanceRow,
  totalSessions: number,
): StudentAttendanceSummary {
  const attendedSessions = Number(row.attended_sessions);
  const missedSessions = totalSessions - attendedSessions;

  const attendancePercentage =
    totalSessions === 0 ? 0 : roundToDecimalPlaces((attendedSessions / totalSessions) * 100, PERCENTAGE_DECIMAL_PLACES);

  return {
    studentId: row.student_id,
    firstName: row.first_name,
    lastName: row.last_name,
    totalSessions,
    attendedSessions,
    missedSessions,
    attendancePercentage,
  };
}

function roundToDecimalPlaces(value: number, decimalPlaces: number): number {
  const factor = 10 ** decimalPlaces;

  return Math.round(value * factor) / factor;
}