import { CourseLanding } from "@/features/courses";
import { Container } from "@/shared";

export default async function StudnetCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const courseId = Number(id);
  return (
    <Container>
      <CourseLanding courseId={courseId} backHref="/student" />
    </Container>
  );
}
