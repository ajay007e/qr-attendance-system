import { ApiResponse } from "@/shared";
import api from "@/shared/lib/api";

import type { StudentCourse } from "../types";

export const enrolmentService = {
  async getEnrolled() {
    const response =
      await api.get<ApiResponse<StudentCourse[]>>("/enrolments/me");

    return response.data;
  },

  async getAvailable(search?: string) {
    const params = search?.trim() ? { search: search.trim() } : undefined;

    const response = await api.get<ApiResponse<StudentCourse[]>>(
      "/enrolments/available",
      { params },
    );

    return response.data;
  },

  async enrol(courseId: number) {
    const response = await api.post<ApiResponse<void>>("/enrolments", {
      courseId,
    });

    return response.data;
  },

  async withdraw(courseId: number) {
    const response = await api.delete<ApiResponse<void>>(
      `/enrolments/${courseId}`,
    );

    return response.data;
  },
};
