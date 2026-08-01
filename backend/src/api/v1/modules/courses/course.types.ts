export interface Course {
  id: number;

  course_code: string;
  course_name: string;
  description: string | null;

  semester: number;
  year: number;

  is_active: boolean;

  created_at: Date;
  updated_at: Date;
}

export interface CourseLecturer {
  id: number;

  first_name: string;
  last_name: string | null;

  email: string;

  role: string;

  created_at: Date;
}

export interface CreateCourseRequest {
  courseCode: string;
  courseName: string;
  description?: string;

  semester: number;
  year: number;
}

export interface UpdateCourseRequest {
  courseCode: string;
  courseName: string;
  description?: string;

  semester: number;
  year: number;
}

export interface UpdateCourseStatusRequest {
  isActive: boolean;
}

export interface AssignLecturerRequest {
  userId: number;
}
