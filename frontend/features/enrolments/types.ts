import type { Course } from "../courses/types";

export interface StudentCourse
  extends Pick<
    Course,
    | "id"
    | "course_code"
    | "course_name"
    | "description"
    | "credits"
    | "session"
    | "is_active"
  > {
  enrolled_at: string | null;
}

export interface EnrolRequest {
  courseId: number;
}

export interface CourseCardProps {
  course: StudentCourse;
  action?: React.ReactNode;
}

export interface CourseSearchProps {
  value: string;
  courses: StudentCourse[];
  loading?: boolean;
  onChange: (value: string) => void;
  onSelect: (course: StudentCourse) => void;
}
