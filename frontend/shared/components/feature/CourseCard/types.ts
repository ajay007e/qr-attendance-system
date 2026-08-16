import { Course } from "@/shared";

export interface CourseCardProps {
  course: Course;
  action?: React.ReactNode;
  href?: string;
}
