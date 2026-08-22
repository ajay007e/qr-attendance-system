import type { PaginationQuery } from "@/types";

export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DatabaseCourse = Omit<Course, "courseCode" | "courseName" | "isActive" | "createdAt" | "updatedAt"> & {
  course_code: string;
  course_name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export type PublicCourse = Omit<Course, "createdAt" | "updatedAt">;

export type CreateCourseRequest = Pick<Course, "courseCode" | "courseName" | "credits"> & {
  description?: string;
};

export type CreateCourseData = Pick<DatabaseCourse, "course_code" | "course_name" | "description" | "credits">;

export type UpdateCourseRequest = CreateCourseRequest;

export type UpdateCourseData = CreateCourseData;

export interface UpdateCourseStatusRequest {
  isActive: boolean;
}

export interface CourseQuery extends PaginationQuery {
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export interface ParticipantQuery extends PaginationQuery {
  search?: string;
}
