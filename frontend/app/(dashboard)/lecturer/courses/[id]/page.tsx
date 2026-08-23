import { AttendancePanel } from "@/features/attendance";
import { CourseLanding } from "@/features/courses";
import { ParticipantsTab } from "@/features/enrolments";
import { SessionControl } from "@/features/session";

export default async function LecturerCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offeringId = Number(id);

  return (
    <CourseLanding
      offeringId={offeringId}
      backHref="/lecturer"
      participantsTab={<ParticipantsTab offeringId={offeringId} />}
      attendanceTab={
        <AttendancePanel
          offeringId={offeringId}
          sessionControls={<SessionControl courseOfferingId={offeringId} />}
          role="lecturer"
        />
      }
    />
  );
}
