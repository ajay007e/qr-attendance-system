import { PaginationQuery } from "@/shared";

export type ScanAttendanceRequest = {
  qrToken: string;
  latitude: number;
  longitude: number;
};

export type AttendanceRecordStatus = "present" | "absent" | "excused" | "late";

export type AttendanceMethod = "qr" | "manual";

export type AttendanceLocationStatus = "verified" | "suspicious" | "not_checked";

export type AttendanceClassType = "lecture" | "laboratory" | "tutorial" | "workshop" | "seminar" | "other";

export type AttendanceStatusFilter = "all" | AttendanceRecordStatus;

export type AttendanceClassTypeFilter = "all" | AttendanceClassType;

export interface AttendanceRecord {
  id: number;
  sessionId: number;
  studentId: number;
  status: AttendanceRecordStatus;
  attendanceMethod: AttendanceMethod;
  locationStatus: AttendanceLocationStatus;
  markedAt: Date;
  markedBy: number | null;
  lecturerNote: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionAttendanceQuery extends PaginationQuery {
  search?: string;
  status?: AttendanceRecordStatus;
  attendanceMethod?: AttendanceMethod;
  locationStatus?: AttendanceLocationStatus;
}

export interface SessionAttendance {
  student: {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
  };
  attendance: AttendanceRecord | null;
}

export interface StudentAttendanceRecord {
  id: number;
  className: string;
  sessionId: number;
  weekNumber: number;
  classNumber: number;
  classType: AttendanceClassType;
  title: string;
  date: string;
  status: AttendanceRecordStatus;
  attendanceMethod: AttendanceMethod;
  locationStatus: AttendanceLocationStatus;
  markedAt: string;
  markedBy?: string;
  lecturerNote?: string;
}

export interface StudentAttendanceQuery {
  status?: AttendanceStatusFilter;
  classType?: AttendanceClassTypeFilter;
  limit?: number;
  cursor?: string;
}

export interface StudentAttendanceStatistics {
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  excusedCount: number;
  attendancePercentage: number;
  lectureSessions: number;
  lecturePresentCount: number;
  lectureAttendancePercentage: number;
  tutorialSessions: number;
  tutorialPresentCount: number;
  tutorialAttendancePercentage: number;
  minimumAttendancePercentage: number;
  attendanceRequirementMet: boolean;
}

export interface StudentAttendanceResponse {
  records: StudentAttendanceRecord[];
  statistics: StudentAttendanceStatistics;
}
