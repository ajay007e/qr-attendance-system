import { api } from "@/shared";

import type { ApiResponse, CourseOffering, Lecturer, PaginatedData } from "@/shared";

import type {
  AssignOfferingLecturerRequest,
  CourseOfferingQuery,
  CreateCourseOfferingRequest,
  UpdateCourseOfferingRequest,
} from "../types";

export const OfferingService = {
  async getOfferings(query?: CourseOfferingQuery) {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(([, value]) => value !== undefined && value !== "" && value !== "ALL"),
    );

    const response = await api.get<ApiResponse<PaginatedData<CourseOffering>>>("/offerings", {
      params,
    });

    return response.data;
  },

  async getOffering(id: number) {
    const response = await api.get<ApiResponse<CourseOffering>>(`/offerings/${id}`);
    console.log(response);

    return response.data;
  },

  async createOffering(data: CreateCourseOfferingRequest) {
    const response = await api.post<ApiResponse<CourseOffering>>("/offerings", data);

    return response.data;
  },

  async updateOffering(id: number, data: UpdateCourseOfferingRequest) {
    const response = await api.put<ApiResponse<CourseOffering>>(`/offerings/${id}`, data);

    return response.data;
  },

  async getLecturers(id: number) {
    const response = await api.get<ApiResponse<Lecturer[]>>(`/offerings/${id}/lecturers`);

    return response.data;
  },

  async assignLecturer(offeringId: number, data: AssignOfferingLecturerRequest) {
    const response = await api.post<ApiResponse<Lecturer>>(`/offerings/${offeringId}/lecturers`, data);

    return response.data;
  },

  async removeLecturer(offeringId: number, userId: number) {
    const response = await api.delete<ApiResponse<void>>(`/offerings/${offeringId}/lecturers/${userId}`);

    return response.data;
  },
};
