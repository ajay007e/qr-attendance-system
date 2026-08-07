import type { CourseSession } from "../courses/types";

export interface StudentCourse {
  id: number;

  course_code: string;
  course_name: string;
  description: string | null;

  credits: number;
  session: CourseSession;

  is_active: boolean;

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
  onChange: (value: string) => void;
}
