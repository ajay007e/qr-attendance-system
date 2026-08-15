import type { Course, LecturerRole } from "@/shared";

export interface StudentCourse extends Course {
  enrolled_at: string | null;
}

export interface AssignedCourse extends Course {
  lecturer_role: LecturerRole;
  assigned_at: string;
}

export interface EnrolRequest {
  courseId: number;
}

export interface CourseSearchProps {
  value: string;
  courses: StudentCourse[];
  loading?: boolean;
  onChange: (value: string) => void;
  onSelect: (course: StudentCourse) => void;
}
