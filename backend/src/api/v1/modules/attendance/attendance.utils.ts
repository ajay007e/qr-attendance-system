import { AppError } from "@/utils";

import type { MarkAttendanceQrRequest } from "./attendance.types";

export function validateMarkAttendanceRequest(data: MarkAttendanceQrRequest) {
  if (!data || typeof data !== "object") {
    throw new AppError("Attendance request is required", 400);
  }

  if (typeof data.qrToken !== "string" || !data.qrToken.trim()) {
    throw new AppError("QR token is required", 400);
  }

  if (typeof data.latitude !== "number" || Number.isNaN(data.latitude) || data.latitude < -90 || data.latitude > 90) {
    throw new AppError("Latitude must be a number between -90 and 90", 400);
  }

  if (
    typeof data.longitude !== "number" ||
    Number.isNaN(data.longitude) ||
    data.longitude < -180 ||
    data.longitude > 180
  ) {
    throw new AppError("Longitude must be a number between -180 and 180", 400);
  }

  return {
    qrToken: data.qrToken.trim(),
    latitude: data.latitude,
    longitude: data.longitude,
  };
}
