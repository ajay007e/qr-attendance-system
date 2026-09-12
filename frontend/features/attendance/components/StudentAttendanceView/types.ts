import useStudentAttendance from "../../hooks/useStudentAttendance";
import { AttendanceClassTypeFilter, AttendanceStatusFilter } from "../../types";

export interface StudentAttendanceViewProps {
  offeringId: number;
}

export type AttendanceSummaryProps = {
  attendancePercentage: number;
  presentCount: number;
  absentCount: number;
  totalSessions: number;
};

export type SummaryCardProps = {
  label: string;
  value: string | number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export type AttendanceFiltersProps = {
  status: AttendanceStatusFilter;
  classType: AttendanceClassTypeFilter;
  onStatusChange: (value: AttendanceStatusFilter) => void;
  onClassTypeChange: (value: AttendanceClassTypeFilter) => void;
};

export type AttendanceTimelineProps = {
  records: ReturnType<typeof useStudentAttendance>["records"];
};

export type AttendanceDetailProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  truncate?: boolean;
};
