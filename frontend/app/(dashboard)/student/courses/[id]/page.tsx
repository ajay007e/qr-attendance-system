import { AttendancePanel } from "@/features/attendance";
import { CourseLanding } from "@/features/courses";
import { ParticipantsTab } from "@/features/enrolments";

export default async function StudentCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offeringId = Number(id);

  return (
    <CourseLanding
      offeringId={offeringId}
      backHref="/student"
      participantsTab={<ParticipantsTab offeringId={offeringId} />}
      attendanceTab={<AttendancePanel offeringId={offeringId} role="student" />}
    />
  );
}
