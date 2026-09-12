import type {
  AttendanceClassTypeFilter,
  AttendanceStatusFilter,
  StudentAttendanceRecord,
  StudentAttendanceSummary,
} from "../../types";

export interface StudentAttendanceViewProps {
  offeringId: number;
}

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

export interface AttendanceSummaryProps {
  summary: StudentAttendanceSummary | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void | Promise<void>;
  classType: AttendanceClassTypeFilter;
  onClassTypeChange: (value: AttendanceClassTypeFilter) => void;
}

export interface AttendanceTimelineProps {
  offeringId: number;

  statusFilter: AttendanceStatusFilter;
  classTypeFilter: AttendanceClassTypeFilter;

  onStatusChange: (value: AttendanceStatusFilter) => void;
  onClassTypeChange: (value: AttendanceClassTypeFilter) => void;
}

export interface TimelineRecordsProps {
  records: StudentAttendanceRecord[];
  now: number;
}

export type AttendanceDetailProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  truncate?: boolean;
};
