import type { AttendanceSession, CreateSessionRequest, UpdateSessionRequest } from "@/features/session";
import { api } from "@/shared";
import type { ApiResponse } from "@/shared";

export const SessionService = {
  async getActiveSession(offeringId: number) {
    const response = await api.get<ApiResponse<AttendanceSession | null>>("/sessions/active", {
      params: {
        course_offering_id: offeringId,
      },
    });

    return response.data;
  },

  async createSession(data: CreateSessionRequest) {
    const response = await api.post<ApiResponse<AttendanceSession>>("/sessions", data);

    return response.data;
  },

  async closeSession(sessionId: number) {
    const response = await api.post<ApiResponse<AttendanceSession>>(`/sessions/${sessionId}/close`);

    return response.data;
  },

  async reopenSession(sessionId: number) {
    const response = await api.post<ApiResponse<AttendanceSession>>(`/sessions/${sessionId}/reopen`);

    return response.data;
  },

  async updateSession(sessionId: number, data: UpdateSessionRequest) {
    const response = await api.put<ApiResponse<AttendanceSession>>(`/sessions/${sessionId}`, data);

    return response.data;
  },

  async getSessionQRCode(sessionId: number) {
    const response = await api.get<
      ApiResponse<{
        token: string;
        expiresAt: string;
      }>
    >(`/sessions/${sessionId}/qr`);

    return response.data;
  },
};
