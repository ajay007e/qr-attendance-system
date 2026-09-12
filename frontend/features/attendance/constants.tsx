import { CalendarDays, CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";

import type {
  AttendanceClassType,
  AttendanceLocationStatus,
  AttendanceMethod,
  AttendanceRecordStatus,
  SessionAttendanceQuery,
} from "./types";

export const ATTENDANCE_TABS = [
  {
    key: "sessions",
    label: "Session Details",
    icon: <CalendarDays size={17} strokeWidth={1.8} />,
  },
  {
    key: "student-attendance",
    label: "Student Attendance",
    icon: <ClipboardCheck size={17} strokeWidth={1.8} />,
  },
] as const;

export const ATTENDANCE_METHOD_FILTER_OPTIONS = [
  { label: "All Methods", value: "" },
  { label: "QR Code", value: "qr" },
  { label: "Manual", value: "manual" },
] satisfies {
  label: string;
  value: AttendanceMethod | "";
}[];

export const ATTENDANCE_LOCATION_FILTER_OPTIONS = [
  { label: "All Locations", value: "" },
  { label: "Verified", value: "verified" },
  { label: "Suspicious", value: "suspicious" },
  { label: "Not Checked", value: "not_checked" },
] satisfies {
  label: string;
  value: AttendanceLocationStatus | "";
}[];

export const DEFAULT_SESSION_ATTENDANCE_QUERY: SessionAttendanceQuery = {
  page: 1,
  limit: 10,
  search: "",
  status: "present",
  attendanceMethod: undefined,
  locationStatus: undefined,
};

export const ATTENDANCE_STATUS_FILTER_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
] as const;

export const ATTENDANCE_CLASS_TYPE_FILTER_OPTIONS = [
  { label: "All Class Types", value: "all" },
  { label: "Lecture", value: "lecture" },
  { label: "Laboratory", value: "laboratory" },
  { label: "Tutorial", value: "tutorial" },
  { label: "Workshop", value: "workshop" },
  { label: "Seminar", value: "seminar" },
  { label: "Other", value: "other" },
] as const;

export const STATUS_CONFIG: Record<
  AttendanceRecordStatus,
  {
    label: string;
    badgeVariant: "green" | "red" | "yellow";
    dotClassName: string;
    icon: typeof CheckCircle2;
  }
> = {
  present: {
    label: "Present",
    badgeVariant: "green",
    dotClassName: "bg-green-500",
    icon: CheckCircle2,
  },

  absent: {
    label: "Absent",
    badgeVariant: "red",
    dotClassName: "bg-red-500",
    icon: XCircle,
  },

  excused: {
    label: "Excused",
    badgeVariant: "yellow",
    dotClassName: "bg-yellow-500",
    icon: ClipboardCheck,
  },

  late: {
    label: "Late",
    badgeVariant: "yellow",
    dotClassName: "bg-yellow-500",
    icon: ClipboardCheck,
  },
};

export const CLASS_TYPE_LABELS: Record<AttendanceClassType, string> = {
  lecture: "Lecture",
  laboratory: "Laboratory",
  tutorial: "Tutorial",
  workshop: "Workshop",
  seminar: "Seminar",
  other: "Other",
};

export const LOCATION_STATUS_CONFIG: Record<
  AttendanceLocationStatus,
  {
    label: string;
    className: string;
  }
> = {
  verified: {
    label: "Location verified",
    className: "bg-green-50 text-green-700",
  },

  suspicious: {
    label: "Location suspicious",
    className: "bg-orange-50 text-orange-700",
  },

  not_checked: {
    label: "Location not checked",
    className: "bg-gray-100 text-gray-600",
  },
};
