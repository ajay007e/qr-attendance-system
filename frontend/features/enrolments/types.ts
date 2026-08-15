import { Course } from "@/shared";
import { LecturerRole } from "../courses";

export type CourseCardCourse = Pick<
  Course,
  "id" | "courseCode" | "courseName" | "description" | "credits" | "session" | "isActive"
>;

export interface StudentCourse extends CourseCardCourse {
  enrolled_at: string | null;
}

export interface AssignedCourse extends CourseCardCourse {
  lecturer_role: LecturerRole;
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
