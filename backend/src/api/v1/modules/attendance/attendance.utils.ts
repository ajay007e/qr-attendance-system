import { AppError } from "@/utils";

import type { MarkAttendanceQrRequest, SessionAttendanceQuery } from "./attendance.types";
import { ATTENDANCE_LOCATION_STATUSES, ATTENDANCE_METHODS, ATTENDANCE_STATUSES } from "./attendance.constants";

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

export function validateSessionAttendanceQuery(query: SessionAttendanceQuery): SessionAttendanceQuery {
  const result: SessionAttendanceQuery = {
    page: query.page,
    limit: query.limit,
  };

  if (query.search?.trim()) {
    result.search = query.search.trim();
  }

  if (query.status) {
    if (!ATTENDANCE_STATUSES.includes(query.status)) {
      throw new AppError("Invalid attendance status", 400);
    }

    result.status = query.status;
  }

  if (query.attendanceMethod) {
    if (!ATTENDANCE_METHODS.includes(query.attendanceMethod)) {
      throw new AppError("Invalid attendance method", 400);
    }

    result.attendanceMethod = query.attendanceMethod;
  }

  if (query.locationStatus) {
    if (!ATTENDANCE_LOCATION_STATUSES.includes(query.locationStatus)) {
      throw new AppError("Invalid location status", 400);
    }

    result.locationStatus = query.locationStatus;
  }

  return result;
}
