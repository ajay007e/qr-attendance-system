import { AppError, ROLES } from "@/utils";

import { AttendanceSessionRepository } from "./session.repository";
import { toAttendanceSession } from "./session.mapper";
import type { AttendanceSession, EditSessionInput, StartSessionInput } from "./session.types";
import { validateWithinEditableWindow } from "./session.utils";
import { QR_TOKEN_EXPIRATION_SECONDS } from "./session.constants";
import { randomBytes } from "crypto";
import { createAttendanceQrToken } from "./session.qr";
import { validateOfferingAccess } from "../offerings";

export class AttendanceSessionService {
  constructor(private readonly repository: AttendanceSessionRepository) {}

  async startSession(input: StartSessionInput, lecturerId: number): Promise<AttendanceSession> {
    await validateOfferingAccess(input.courseOfferingId, lecturerId, ROLES.LECTURER);

    const session = await this.repository.create({
      course_offering_id: input.courseOfferingId,
      lecturer_id: lecturerId,
      week_number: input.weekNumber,
      class_type: input.classType,
      session_start_at: input.sessionStartAt,
      session_end_at: input.sessionEndAt,
      latitude: input.latitude,
      longitude: input.longitude,
    });

    if (!session) {
      throw new AppError("An active attendance session already exists for this course", 409);
    }

    return toAttendanceSession(session);
  }

  async getActiveSession(courseOfferingId: number): Promise<AttendanceSession | null> {
    const session = await this.repository.findActiveByCourse(courseOfferingId);

    return session ? toAttendanceSession(session) : null;
  }

  async closeSession(sessionId: number, lecturerId: number): Promise<AttendanceSession> {
    const existing = await this.repository.findById(sessionId);

    if (!existing) {
      throw new AppError("Attendance session not found", 404);
    }

    await validateOfferingAccess(existing.course_offering_id, lecturerId, ROLES.LECTURER);

    if (existing.session_status !== "open") {
      throw new AppError("Only an open session can be closed", 400);
    }

    const closed = await this.repository.close(sessionId);

    if (!closed) {
      throw new AppError("Only an open session can be closed", 400);
    }

    const updated = await this.repository.findById(sessionId);

    return toAttendanceSession(updated!);
  }

  async reopenSession(sessionId: number, lecturerId: number): Promise<AttendanceSession> {
    const existing = await this.repository.findById(sessionId);

    if (!existing) {
      throw new AppError("Attendance session not found", 404);
    }

    await validateOfferingAccess(existing.course_offering_id, lecturerId, ROLES.LECTURER);

    if (existing.session_status !== "closed") {
      throw new AppError("Only a closed session can be reopened", 400);
    }

    const reopened = await this.repository.reopen(sessionId, existing.course_offering_id);

    if (!reopened) {
      throw new AppError("Another active session already exists for this course", 409);
    }

    return toAttendanceSession(reopened);
  }

  async editSession(sessionId: number, input: EditSessionInput, lecturerId: number): Promise<AttendanceSession> {
    const existing = await this.repository.findById(sessionId);

    if (!existing) {
      throw new AppError("Attendance session not found", 404);
    }

    await validateOfferingAccess(existing.course_offering_id, lecturerId, ROLES.LECTURER);

    if (existing.session_status !== "open") {
      throw new AppError("Only an open session can be edited", 400);
    }

    validateWithinEditableWindow(toAttendanceSession(existing));

    const updated = await this.repository.update(sessionId, {
      week_number: input.weekNumber,
      class_type: input.classType,
      session_start_at: input.sessionStartAt,
      session_end_at: input.sessionEndAt,
    });

    return toAttendanceSession(updated!);
  }

  async generateQRCode(sessionId: number, lecturerId: number): Promise<{ token: string; expiresAt: string }> {
    const session = await this.repository.findById(sessionId);

    if (!session) {
      throw new AppError("Attendance session not found", 404);
    }

    await validateOfferingAccess(session.course_offering_id, lecturerId, ROLES.LECTURER);

    if (session.session_status !== "open") {
      throw new AppError("QR code can only be generated for an open session", 400);
    }

    const expiresAt = new Date(Date.now() + QR_TOKEN_EXPIRATION_SECONDS * 1000);

    const nonce = randomBytes(32).toString("hex");

    const payload = {
      sid: session.id,
      exp: Math.floor(expiresAt.getTime() / 1000),
      nonce,
    };

    const token = createAttendanceQrToken(payload);

    return {
      token,
      expiresAt: expiresAt.toISOString(),
    };
  }
}
