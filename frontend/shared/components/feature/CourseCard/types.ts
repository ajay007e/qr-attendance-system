import { StudentCourse, AssignedCourse } from "@/features/enrolments";

export interface CourseCardProps {
  course: StudentCourse | AssignedCourse;
  action?: React.ReactNode;
  href?: string;
}
