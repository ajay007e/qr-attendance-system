import type { Course } from "@/shared";

export interface CourseTableProps {
  courses: Course[];

  onEdit: (course: Course) => void;
}

export interface CourseActionProps {
  course: Course;

  onEdit: (course: Course) => void;
}
