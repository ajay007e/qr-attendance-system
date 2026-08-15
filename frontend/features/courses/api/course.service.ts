import { api } from "@/shared";
import type { ApiResponse, Course, Lecturer, PaginatedData } from "@/shared";
import type { AssignLecturerRequest, CourseQuery, CreateCourseRequest, UpdateCourseRequest } from "../types";

export const CourseService = {
  async getCourses(query?: CourseQuery) {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(([, value]) => value !== undefined && value !== "" && value !== "ALL"),
    );

    const response = await api.get<ApiResponse<PaginatedData<Course>>>("/courses", { params });
    return response.data;
  },

  async getCourse(id: number) {
    const response = await api.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data;
  },

  async createCourse(data: CreateCourseRequest) {
    const response = await api.post<ApiResponse<Course>>("/courses", data);
    return response.data;
  },

  async updateCourse(id: number, data: UpdateCourseRequest) {
    const response = await api.put<ApiResponse<Course>>(`/courses/${id}`, data);
    return response.data;
  },

  async changeStatus(id: number, isActive: boolean) {
    const response = await api.patch<ApiResponse<Course>>(`/courses/${id}/status`, { isActive });
    return response.data;
  },

  async getLecturers(id: number) {
    const response = await api.get<ApiResponse<Lecturer[]>>(`/courses/${id}/lecturers`);
    return response.data;
  },

  async assignLecturer(courseId: number, data: AssignLecturerRequest) {
    const response = await api.post<ApiResponse<Lecturer>>(`/courses/${courseId}/lecturers`, data);
    return response.data;
  },

  async removeLecturer(courseId: number, userId: number) {
    const response = await api.delete<ApiResponse<void>>(`/courses/${courseId}/lecturers/${userId}`);
    return response.data;
  },
};
