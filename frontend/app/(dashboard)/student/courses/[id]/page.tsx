import { AttendancePanel } from "@/features/attendance";
import { CourseLanding } from "@/features/courses";
import { ParticipantsTab } from "@/features/enrolments";
import { Container } from "@/shared";

export default async function StudentCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = Number(id);

  return (
    <Container>
      <CourseLanding
        courseId={courseId}
        backHref="/lecturer"
        participantsTab={<ParticipantsTab courseId={courseId} />}
        attendanceTab={<AttendancePanel courseId={courseId} role="student" />}
      />
    </Container>
  );
}
