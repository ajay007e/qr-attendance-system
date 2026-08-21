import type { CourseQuery, CreateCourseRequest, UpdateCourseRequest } from "@/features/courses";
import { api } from "@/shared";
import type { ApiResponse, Course, PaginatedData } from "@/shared";

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
};
