"use client";

import { AttendancePanel } from "@/features/attendance";
import { SessionControl, useSession } from "@/features/session";
import { PageLoader } from "@/shared";

export function LecturerCourseAttendance({ offeringId }: { offeringId: number }) {
  const { session, loading, refresh } = useSession(offeringId);
  const isSessionOpen = session?.status === "open";

  if (loading) {
    <PageLoader message="Loading..." />;
  }

  return (
    <AttendancePanel
      offeringId={offeringId}
      isSessionOpen={isSessionOpen}
      sessionControls={<SessionControl offeringId={offeringId} session={session} onSessionChange={refresh} />}
      role="lecturer"
    />
  );
}
