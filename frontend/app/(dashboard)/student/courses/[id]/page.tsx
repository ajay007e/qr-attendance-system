import { CourseLanding } from "@/features/courses";
import { ParticipantsTab } from "@/features/enrolments";

export default async function StudentCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = Number(id);
  return (
    <CourseLanding
      offeringId={courseId}
      backHref="/student"
      participantsTab={<ParticipantsTab offeringId={courseId} />}
    />
  );
}
