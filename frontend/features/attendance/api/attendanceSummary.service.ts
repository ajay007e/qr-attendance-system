
import { api } from "@/shared";
import type { ApiResponse, PaginatedData } from "@/shared";

import type { AttendanceSummaryRecord, SummaryQuery } from "../types";

export const AttendanceSummaryService = {
  async getSummary(offeringId: number, params: SummaryQuery) {
    const response = await api.get<ApiResponse<PaginatedData<AttendanceSummaryRecord>>>(
      `/summary/${offeringId}`,
      { params },
    );

    return response.data;
  },
};