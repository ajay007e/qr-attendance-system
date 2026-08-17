import { LecturerAttendanceView } from "../LecturerAttendanceView/LecturerAttendanceView";
import { StudentAttendanceView } from "../StudentAttendanceView/StudentAttendanceView";
import { AttendancePanelProps } from "./types";

export function AttendancePanel({ courseId, role, sessionControls }: AttendancePanelProps) {
  if (role === "lecturer") {
    return <LecturerAttendanceView courseId={courseId} sessionControls={sessionControls} />;
  }

  return <StudentAttendanceView courseId={courseId} />;
}
