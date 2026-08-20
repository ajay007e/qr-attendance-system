import { CourseLanding } from "@/features/courses";
import { ParticipantsTab } from "@/features/enrolments";
import { Container } from "@/shared";

export default async function StudentCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = Number(id);
  return (
    <Container>
      <CourseLanding
        offeringId={courseId}
        backHref="/lecturer"
        participantsTab={<ParticipantsTab offeringId={courseId} />}
      />
    </Container>
  );
}
