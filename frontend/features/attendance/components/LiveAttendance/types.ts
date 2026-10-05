import { SessionAttendance, SessionAttendanceQuery } from "../../types";

export interface LiveAttendanceProps {
  sessionId: number;
  sessionControls?: React.ReactNode;
}

export interface AttendanceTableProps {
  records: SessionAttendance[];
  onUpdateStatus?: (studentId: number) => void;
}

export interface AttendanceToolbarProps {
  filters: SessionAttendanceQuery;
  onFiltersChange: (filters: SessionAttendanceQuery) => void;
}
