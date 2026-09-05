import { api } from "@/shared";
import type { ApiResponse } from "@/shared";

import type { AttendanceRecord, ScanAttendanceRequest } from "../types";

export const AttendanceService = {
  async scanQRCode(data: ScanAttendanceRequest) {
    const response = await api.post<ApiResponse<AttendanceRecord>>("/attendance/scan", data);

    return response.data;
  },
};
