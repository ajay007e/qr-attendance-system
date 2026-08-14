export const COURSE_SESSIONS = [
  "ANNUAL",
  "SPRING",
  "SUMMER",
  "AUTUMN",
  "WINTER",
  "TRIMESTER_1",
  "TRIMESTER_2",
  "TRIMESTER_3",
] as const;

export type CourseSession = (typeof COURSE_SESSIONS)[number];

export const COURSE_LECTURER_ROLES = ["PRIMARY", "SECONDARY", "TUTOR"] as const;

export type CourseLecturerRole = (typeof COURSE_LECTURER_ROLES)[number];

export interface Course {
  id: number;

  course_code: string;
  course_name: string;
  description: string | null;

  credits: number;

  session: CourseSession;

  is_active: boolean;

  created_at: Date;
  updated_at: Date;
}

export interface CourseLecturer {
  id: number;

  first_name: string;
  last_name: string | null;

  email: string;

  role: CourseLecturerRole;

  created_at: Date;
}

export interface PaginatedCourses {
  data: Course[];

  pagination: {
    page: number;
    limit: number;
    count: number;
    total: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export interface CreateCourseRequest {
  courseCode: string;
  courseName: string;
  description?: string;
  credits: number;
  session: CourseSession;
}

export interface UpdateCourseRequest {
  courseCode: string;
  courseName: string;
  description?: string;
  credits: number;
  session: CourseSession;
}

export interface UpdateCourseStatusRequest {
  isActive: boolean;
}

export interface AssignLecturerRequest {
  userId: number;
  role: CourseLecturerRole;
}

export interface CourseQuery {
  search?: string;
  session?: CourseSession;
  status?: "ACTIVE" | "INACTIVE";
  page?: number;
  limit?: number;
}

export interface ParticipantQuery {
  search?: string;
  page?: number;
  limit?: number;
}
