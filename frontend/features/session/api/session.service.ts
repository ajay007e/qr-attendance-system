import type { AttendanceSession, CreateSessionRequest, UpdateSessionRequest } from "@/features/session";
import { api } from "@/shared";
import type { ApiResponse } from "@/shared";
import { MockSessionService } from "./session.mock";

const USE_MOCK_API = true;

export const SessionService = {
  async getActiveSession(offeringId: number) {
    if (USE_MOCK_API) {
      return MockSessionService.getActiveSession(offeringId);
    }

    const response = await api.get<ApiResponse<AttendanceSession | null>>("/attendance-sessions/active", {
      params: {
        course_offering_id: offeringId,
      },
    });

    return response.data;
  },

  async createSession(data: CreateSessionRequest) {
    if (USE_MOCK_API) {
      return MockSessionService.createSession(data);
    }

    const response = await api.post<ApiResponse<AttendanceSession>>("/attendance-sessions", data);

    return response.data;
  },

  async closeSession(sessionId: number) {
    if (USE_MOCK_API) {
      return MockSessionService.closeSession(sessionId);
    }

    const response = await api.post<ApiResponse<AttendanceSession>>(`/attendance-sessions/${sessionId}/close`);

    return response.data;
  },

  async reopenSession(sessionId: number) {
    if (USE_MOCK_API) {
      return MockSessionService.reopenSession(sessionId);
    }

    const response = await api.post<ApiResponse<AttendanceSession>>(`/attendance-sessions/${sessionId}/reopen`);

    return response.data;
  },

  async updateSession(sessionId: number, data: UpdateSessionRequest) {
    if (USE_MOCK_API) {
      return MockSessionService.updateSession(sessionId, data);
    }

    const response = await api.put<ApiResponse<AttendanceSession>>(`/attendance-sessions/${sessionId}`, data);

    return response.data;
  },

  async getSessionQRCode(sessionId: number) {
    if (USE_MOCK_API) {
      return MockSessionService.getSessionQRCode(sessionId);
    }
    const response = await api.get<
      ApiResponse<{
        token: string;
        expiresAt: string;
      }>
    >(`/attendance-sessions/${sessionId}/qr`);

    return response.data;
  },
};
