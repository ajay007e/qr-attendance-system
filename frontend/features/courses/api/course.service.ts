import api from "@/shared/lib/api";
import { AssignLecturerRequest, CreateCourseRequest, CourseQuery, UpdateCourseRequest } from "../types";

import { Course, CourseLecturer } from "../types";

export class CourseService {
  static async list(query: CourseQuery) {
    const params = new URLSearchParams();
    if (query.page) params.append("page", String(query.page));
    if (query.limit) params.append("limit", String(query.limit));
    if (query.search) params.append("search", query.search);
    if (query.session !== "ALL") params.append("session", query.session);
    if (query.status !== "ALL") params.append("status", query.status);
    const response = await api.get(`/courses?${params.toString()}`);
    return response.data;
  }

  static async get(id: number) {
    const response = await api.get(`/courses/${id}`);
    return response.data.data as Course;
  }

  static async create(data: CreateCourseRequest) {
    const response = await api.post("/courses", data);
    return response.data.data as Course;
  }

  static async update(id: number, data: UpdateCourseRequest) {
    const response = await api.put(`/courses/${id}`, data);
    return response.data.data as Course;
  }

  static async updateStatus(id: number, isActive: boolean) {
    const response = await api.patch(`/courses/${id}/status`, {
      isActive,
    });
    return response.data.data as Course;
  }

  static async getLecturers(id: number) {
    const response = await api.get(`/courses/${id}/lecturers`);
    return response.data.data as CourseLecturer[];
  }

  static async assignLecturer(courseId: number, data: AssignLecturerRequest) {
    const response = await api.post(`/courses/${courseId}/lecturers`, data);
    return response.data;
  }

  static async removeLecturer(courseId: number, userId: number) {
    const response = await api.delete(`/courses/${courseId}/lecturers/${userId}`);
    return response.data;
  }
}
