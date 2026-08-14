import type { Course } from "../courses/types";

export type CourseCardCourse = Pick<
  Course,
  "id" | "course_code" | "course_name" | "description" | "credits" | "session" | "is_active"
>;

export interface StudentCourse extends CourseCardCourse {
  enrolled_at: string | null;
}

export interface AssignedCourse extends CourseCardCourse {
  lecturer_role: "PRIMARY" | "SECONDARY" | "TUTOR";
  assigned_at: string;
}

export interface EnrolRequest {
  courseId: number;
}

export interface CourseCardProps {
  course: CourseCardCourse;
  action?: React.ReactNode;
  href?: string;
}

export interface CourseSearchProps {
  value: string;
  courses: StudentCourse[];
  loading?: boolean;
  onChange: (value: string) => void;
  onSelect: (course: StudentCourse) => void;
}
