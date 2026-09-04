import { CalendarDays, ClipboardCheck } from "lucide-react";

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
