import type { StudentAttendanceSummary } from "@/features/summary";
import { api } from "@/shared";
import type { ApiResponse } from "@/shared";

export const AttendanceSummaryService = {
  async getSummary(offeringId: number) {
    const response = await api.get<ApiResponse<StudentAttendanceSummary[]>>(
      `/offerings/${offeringId}/attendance-summary`,
    );

    return response.data;
  },
};