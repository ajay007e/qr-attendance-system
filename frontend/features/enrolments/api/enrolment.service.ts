import { COURSE_SEARCH_LIMIT } from "@/features/enrolments";
import type { AssignedCourse, StudentCourse } from "@/features/enrolments";
import type { ApiResponse, PaginatedData, Participant } from "@/shared";
import { api } from "@/shared";

export const enrolmentService = {
  async getEnrolled() {
    const response = await api.get<ApiResponse<StudentCourse[]>>("/enrolments/me");

    return response.data;
  },

  async getAssigned() {
    const response = await api.get<ApiResponse<AssignedCourse[]>>("/enrolments/lecturer/courses");

    return response.data;
  },

  async getAvailable(search?: string) {
    const params = search?.trim()
      ? {
          search: search.trim(),
          limit: COURSE_SEARCH_LIMIT,
          offset: 0,
        }
      : undefined;

    const response = await api.get<ApiResponse<PaginatedData<StudentCourse>>>("/enrolments/available", { params });

    return response.data;
  },

  async enrol(courseId: number) {
    const response = await api.post<ApiResponse<void>>("/enrolments", {
      courseOfferingId: courseId,
    });

    return response.data;
  },

  async withdraw(courseId: number) {
    const response = await api.delete<ApiResponse<void>>(`/enrolments/${courseId}`);

    return response.data;
  },

  async getCourseStudents(
    courseId: number,
    params: {
      search?: string;
      page?: number;
      limit?: number;
    },
  ) {
    const response = await api.get<ApiResponse<PaginatedData<Participant>>>(
      `/enrolments/offerings/${courseId}/students`,
      {
        params,
      },
    );

    return response.data;
  },
};
