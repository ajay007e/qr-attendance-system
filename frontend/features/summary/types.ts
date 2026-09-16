export interface StudentAttendanceSummary {
  studentId: number;
  firstName: string;
  lastName: string | null;
  totalSessions: number;
  attendedSessions: number;
  missedSessions: number;
  attendancePercentage: number;
}