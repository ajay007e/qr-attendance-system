import { CalendarDays, ClipboardCheck } from "lucide-react";

import type {
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

export const ATTENDANCE_STATUS_FILTER_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
  { label: "Excused", value: "excused" },
  { label: "Late", value: "late" },
] satisfies {
  label: string;
  value: AttendanceRecordStatus | "";
}[];

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
