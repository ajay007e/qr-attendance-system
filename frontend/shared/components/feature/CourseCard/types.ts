import type { Course } from "@/shared";

export interface CourseCardProps {
  course: Pick<Course, "courseCode" | "courseName">;
  action?: React.ReactNode;
  href?: string;
}
