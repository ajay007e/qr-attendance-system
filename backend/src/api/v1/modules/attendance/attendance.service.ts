import { AppError, calculateDistance, ROLES } from "@/utils";

import { AttendanceSessionRepository } from "../sessions/session.repository";
import { AttendanceRepository } from "./attendance.repository";
import { verifyAttendanceQrToken } from "./attendance.qr";
import { env } from "@/config";

import type { CursorPaginatedData, PaginatedData } from "@/types";

import type {
  MarkAttendanceQrRequest,
  SessionAttendance,
  SessionAttendanceQuery,
  StudentAttendanceQuery,
  StudentAttendanceRecord,
} from "./attendance.types";

import { mapAttendanceRecord, mapSessionAttendances, mapStudentAttendances } from "./attendance.mapper";
import { validateOfferingAccess } from "../offerings";
import { AttendanceWebSocket } from "../web-socket";

export class AttendanceService {
  constructor(
    private readonly repository: AttendanceRepository,
    private readonly sessionRepository: AttendanceSessionRepository,
    private readonly websocket: AttendanceWebSocket,
  ) {}

  async markQrAttendance(data: MarkAttendanceQrRequest, studentId: number) {
    const { qrToken, latitude, longitude } = data;

    if (!qrToken || typeof qrToken !== "string") {
      throw new AppError("QR token is required", 400);
    }

    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      throw new AppError("Invalid latitude", 400);
    }

    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      throw new AppError("Invalid longitude", 400);
    }

    const payload = verifyAttendanceQrToken(qrToken);

    if (!payload) {
      throw new AppError("Invalid or expired QR code", 400);
    }

    const session = await this.sessionRepository.findById(payload.sid);

    if (!session) {
      throw new AppError("The attendance session no longer exists", 404);
    }

    if (session.session_status !== "open") {
      throw new AppError("This attendance session is no longer open", 400);
    }

    const now = new Date();

    if (now < session.session_start_at) {
      throw new AppError("This attendance session has not started yet", 400);
    }

    if (now > session.session_end_at) {
      throw new AppError("This attendance session has ended", 400);
    }

    await validateOfferingAccess(session.course_offering_id, studentId, ROLES.STUDENT);

    const existingAttendance = await this.repository.findBySessionAndStudent(payload.sid, studentId);

    if (existingAttendance) {
      throw new AppError("You have already marked attendance for this session", 409);
    }

    const distance = calculateDistance(latitude, longitude, Number(session.latitude), Number(session.longitude));

    const locationStatus = distance <= env.attendanceLocationRadius ? "verified" : "suspicious";

    const record = await this.repository.create({
      session_id: payload.sid,
      student_id: studentId,
      status: "present",
      attendance_method: "qr",
      location_status: locationStatus,
    });
    this.websocket.notifyAttendanceMarked(payload.sid);
    return mapAttendanceRecord(record);
  }

  async getSessionAttendance(
    sessionId: number,
    query: SessionAttendanceQuery,
    lecturerId: number,
  ): Promise<PaginatedData<SessionAttendance>> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session) {
      throw new AppError("Attendance session not found", 404);
    }
    await validateOfferingAccess(session.course_offering_id, lecturerId, ROLES.LECTURER);
    const result = await this.repository.getSessionAttendance(sessionId, session.course_offering_id, query);
    return {
      items: mapSessionAttendances(result.items),
      meta: result.meta,
    };
  }

  async getMyAttendance(
    query: StudentAttendanceQuery,
    studentId: number,
    courseOfferingId: number,
  ): Promise<CursorPaginatedData<StudentAttendanceRecord>> {
    await validateOfferingAccess(courseOfferingId, studentId, ROLES.STUDENT);
    const result = await this.repository.getStudentAttendance(studentId, courseOfferingId, query);

    return {
      items: mapStudentAttendances(result.items),
      meta: {
        limit: query.limit ?? 20,
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
      },
    };
  }
}
