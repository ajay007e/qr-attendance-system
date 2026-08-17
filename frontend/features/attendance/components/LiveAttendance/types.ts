export interface LiveAttendanceProps {
  courseId: number;
}

export type AttendanceStatus = "present" | "absent";

export interface LiveAttendanceRecord {
  id: number;
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  status: AttendanceStatus;
  markedAt?: string;
}

export interface LiveAttendanceTableProps {
  records: LiveAttendanceRecord[];
}

export interface LiveAttendanceTableRowProps {
  record: LiveAttendanceRecord;
}

export interface LiveAttendanceCardProps {
  record: LiveAttendanceRecord;
}
