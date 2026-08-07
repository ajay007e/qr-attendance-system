import { CourseSession } from "../courses/course.types";

export interface EnrolledCourse {
  id: number;

  course_code: string;
  course_name: string;
  description: string | null;

  credits: number;
  session: CourseSession;

  is_active: boolean;

  enrolled_at: Date;
}

export interface CourseStudent {
  id: number;

  first_name: string;
  last_name: string | null;

  email: string;

  role: string;

  enrolled_at: Date;
}

export interface EnrolRequest {
  courseId: number;
}
