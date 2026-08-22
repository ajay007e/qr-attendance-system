import { LecturerAttendanceView } from "../LecturerAttendanceView/LecturerAttendanceView";
import { StudentAttendanceView } from "../StudentAttendanceView/StudentAttendanceView";
import { AttendancePanelProps } from "./types";

export function AttendancePanel({ offeringId, role, sessionControls }: AttendancePanelProps) {
  if (role === "lecturer") {
    return <LecturerAttendanceView offeringId={offeringId} sessionControls={sessionControls} />;
  }

  return <StudentAttendanceView offeringId={offeringId} />;
}
