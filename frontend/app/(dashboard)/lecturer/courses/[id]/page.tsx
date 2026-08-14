import { Course, CourseLanding } from "@/features/courses";
import { Container } from "@/shared";

const course: Course = {
  id: 1,
  course_code: "CS101",
  course_name: "Introduction to Programming",
  description:
    "An introduction to programming concepts, problem solving, algorithms, and fundamental software development practices.",
  credits: 6,
  session: "SUMMER",
  is_active: true,
  created_at: new Date(),
  updated_at: new Date(),
};

export default function LecturerCoursePage() {
  return (
    <Container>
      <CourseLanding course={course} backHref="/lecturer" />
    </Container>
  );
}
