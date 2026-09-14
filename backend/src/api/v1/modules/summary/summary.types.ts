export interface StudentAttendanceSummary {
  studentId: number;
  firstName: string;
  lastName: string | null;
  totalSessions: number;
  attendedSessions: number;
  missedSessions: number;
  attendancePercentage: number;
}

export interface DatabaseStudentAttendanceRow {
  student_id: number;
  first_name: string;
  last_name: string | null;
  attended_sessions: number;
}