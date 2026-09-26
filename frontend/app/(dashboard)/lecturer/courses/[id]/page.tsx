import { CourseLanding } from "@/features/courses";
import { ParticipantsTab } from "@/features/enrolments";

import { LecturerCourseAttendance } from "./client";

export default async function LecturerCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offeringId = Number(id);

  return (
    <CourseLanding
      offeringId={offeringId}
      backHref="/lecturer"
      participantsTab={<ParticipantsTab offeringId={offeringId} />}
      attendanceTab={<LecturerCourseAttendance offeringId={offeringId} />}
    />
  );
}
