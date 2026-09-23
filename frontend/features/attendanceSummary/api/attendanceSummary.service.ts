import type { StudentAttendanceSummary, SummaryQuery } from "../types";

import { api } from "@/shared";
import type { ApiResponse, PaginatedData } from "@/shared";

export const AttendanceSummaryService = {
  async getSummary(offeringId: number, params: SummaryQuery) {
    const response = await api.get<ApiResponse<PaginatedData<StudentAttendanceSummary>>>(
      `/offerings/${offeringId}/attendance-summary`,
      { params },
    );

    return response.data;
  },
};