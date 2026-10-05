import { AppError } from "@/utils";

import type {
  MarkAttendanceManualRequest,
  MarkAttendanceQrRequest,
  SessionAttendanceQuery,
  StudentAttendanceCursor,
  StudentAttendanceQuery,
} from "./attendance.types";
import { ATTENDANCE_LOCATION_STATUSES, ATTENDANCE_METHODS, ATTENDANCE_STATUSES, LECTURER_NOTE_MAX_LENGTH,} from "./attendance.constants";

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

export function validateMarkAttendanceManualRequest(data: MarkAttendanceManualRequest) {
  if (!data || typeof data !== "object") {
    throw new AppError("Attendance request is required", 400);
  }

  if (!Number.isInteger(data.studentId) || data.studentId <= 0) {
    throw new AppError("A valid studentId is required", 400);
  }

    const status = data.status ?? "present";

  if (!ATTENDANCE_STATUSES.includes(status)) {
    throw new AppError("Invalid attendance status", 400);
  }

  if (data.lecturerNote !== undefined && data.lecturerNote !== null && typeof data.lecturerNote !== "string") {
    throw new AppError("Lecturer note must be text", 400);
  }

  const lecturerNote = data.lecturerNote?.trim() || null;

  if (lecturerNote && lecturerNote.length > LECTURER_NOTE_MAX_LENGTH) {
    throw new AppError(`Lecturer note must be ${LECTURER_NOTE_MAX_LENGTH} characters or fewer`, 400);
  }

  return {
    studentId: data.studentId,
    status,
    lecturerNote,
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

export function validateStudentAttendanceQuery(query: StudentAttendanceQuery): StudentAttendanceQuery {
  const result: StudentAttendanceQuery = {
    limit: query.limit,
  };

  if (query.limit !== undefined) {
    if (!Number.isInteger(query.limit) || query.limit <= 0) {
      throw new AppError("Invalid attendance limit", 400);
    }
  }

  if (query.status) {
    if (query.status !== "present" && query.status !== "absent") {
      throw new AppError("Invalid attendance status", 400);
    }

    result.status = query.status;
  }

  if (query.classType?.trim()) {
    result.classType = query.classType.trim();
  }

  if (query.cursor) {
    result.cursor = query.cursor.trim();

    // Validate the cursor now instead of failing inside the repository.
    decodeStudentAttendanceCursor(result.cursor);
  }

  return result;
}

export function encodeStudentAttendanceCursor(cursor: StudentAttendanceCursor): string {
  return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");
}

export function decodeStudentAttendanceCursor(cursor: string): StudentAttendanceCursor {
  try {
    const decoded = JSON.parse(Buffer.from(cursor, "base64url").toString("utf8")) as StudentAttendanceCursor;

    if (
      !Number.isInteger(decoded.weekNumber) ||
      !Number.isInteger(decoded.classNumber) ||
      !Number.isInteger(decoded.sessionId) ||
      typeof decoded.classType !== "string" ||
      typeof decoded.sessionStartAt !== "string"
    ) {
      throw new Error("Invalid cursor");
    }

    return decoded;
  } catch {
    throw new AppError("Invalid attendance cursor", 400);
  }
}
