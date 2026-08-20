import { CourseLanding } from "@/features/courses";
import { ParticipantsTab } from "@/features/enrolments";
import { Container } from "@/shared";

export default async function LecturerCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offeringId = Number(id);
  return (
    <Container>
      <CourseLanding
        offeringId={offeringId}
        backHref="/lecturer"
        participantsTab={<ParticipantsTab offeringId={offeringId} />}
      />
    </Container>
  );
}
