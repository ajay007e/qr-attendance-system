import { LecturerAttendanceView } from "../LecturerAttendanceView/LecturerAttendanceView";
import { StudentAttendanceView } from "../StudentAttendanceView/StudentAttendanceView";

import { AttendancePanelProps } from "./types";

export function AttendancePanel({ offeringId, role, sessionControls, isSessionOpen, sessionId }: AttendancePanelProps) {
  if (role === "lecturer") {
    return (
      <LecturerAttendanceView
        offeringId={offeringId}
        sessionId={sessionId}
        sessionControls={sessionControls}
        isSessionOpen={isSessionOpen ?? false}
      />
    );
  }

  return <StudentAttendanceView offeringId={offeringId} />;
}
