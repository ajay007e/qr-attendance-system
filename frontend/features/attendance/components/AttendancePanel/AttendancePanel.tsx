import { LecturerAttendanceView } from "../LecturerAttendanceView/LecturerAttendanceView";
import { StudentAttendanceView } from "../StudentAttendanceView/StudentAttendanceView";

import { AttendancePanelProps } from "./types";

export function AttendancePanel({ offeringId, role, sessionControls, isSessionOpen }: AttendancePanelProps) {
  if (role === "lecturer") {
    return (
      <LecturerAttendanceView
        offeringId={offeringId}
        sessionControls={sessionControls}
        isSessionOpen={isSessionOpen ?? false}
      />
    );
  }

  return <StudentAttendanceView offeringId={offeringId} />;
}
