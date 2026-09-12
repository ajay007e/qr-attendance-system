import { api } from "@/shared";
import type { ApiResponse, CursorPaginatedData, PaginatedData } from "@/shared";

import type {
  AttendanceRecord,
  ScanAttendanceRequest,
  SessionAttendance,
  SessionAttendanceQuery,
  StudentAttendanceQuery,
  StudentAttendanceRecord,
  StudentAttendanceSummary,
  StudentAttendanceSummaryQuery,
} from "../types";

export const AttendanceService = {
  async scanQRCode(data: ScanAttendanceRequest) {
    const response = await api.post<ApiResponse<AttendanceRecord>>("/attendance/scan", data);

    return response.data;
  },

  async getSessionAttendance(sessionId: number, query?: SessionAttendanceQuery, signal?: AbortSignal) {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(([, value]) => value !== undefined && value !== "" && value !== "ALL"),
    );

    const response = await api.get<ApiResponse<PaginatedData<SessionAttendance>>>(`/attendance/${sessionId}`, {
      params,
      signal,
    });

    return response.data;
  },

  async getStudentAttendance(offeringId: number, query?: StudentAttendanceQuery, signal?: AbortSignal) {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(([, value]) => value !== undefined && value !== "" && value !== "ALL"),
    );

    const response = await api.get<ApiResponse<CursorPaginatedData<StudentAttendanceRecord>>>(
      `/attendance/student/${offeringId}`,
      {
        params,
        signal,
      },
    );

    return response.data;
  },

  async getStudentAttendanceSummary(offeringId: number, query?: StudentAttendanceSummaryQuery, signal?: AbortSignal) {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(([, value]) => value !== undefined && value !== "" && value !== "ALL"),
    );

    const response = await api.get<ApiResponse<StudentAttendanceSummary>>(`/attendance/student/summary/${offeringId}`, {
      params,
      signal,
    });

    return response.data;
  },
};
