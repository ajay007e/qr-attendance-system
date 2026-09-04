import { AppError } from "@/utils";

import { AttendanceSessionRepository } from "./session.repository";
import { toAttendanceSession } from "./session.mapper";
import type { AttendanceSession, EditSessionInput, StartSessionInput } from "./session.types";
import { validateWithinEditableWindow } from "./session.utils";

export class AttendanceSessionService {
  constructor(private readonly repository: AttendanceSessionRepository) {}

  async startSession(input: StartSessionInput, lecturerId: number): Promise<AttendanceSession> {
    // TODO: reinstate the "lecturer must be assigned to this course" check
    // (courseRepository.isLecturerAssigned) once that rule is confirmed for
    // this version of the story. Currently any lecturer may start a session
    // for any course.

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

  async closeSession(sessionId: number, _lecturerId: number): Promise<AttendanceSession> {
    const existing = await this.repository.findById(sessionId);

    if (!existing) {
      throw new AppError("Attendance session not found", 404);
    }

    // TODO: reinstate the "lecturer must be assigned to this course" check.

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

  async reopenSession(sessionId: number, _lecturerId: number): Promise<AttendanceSession> {
    const existing = await this.repository.findById(sessionId);

    if (!existing) {
      throw new AppError("Attendance session not found", 404);
    }

    // TODO: reinstate the "lecturer must be assigned to this course" check.

    if (existing.session_status !== "closed") {
      throw new AppError("Only a closed session can be reopened", 400);
    }

    const reopened = await this.repository.reopen(sessionId, existing.course_offering_id);

    if (!reopened) {
      throw new AppError("Another active session already exists for this course", 409);
    }

    return toAttendanceSession(reopened);
  }

  async editSession(sessionId: number, input: EditSessionInput, _lecturerId: number): Promise<AttendanceSession> {
    const existing = await this.repository.findById(sessionId);

    if (!existing) {
      throw new AppError("Attendance session not found", 404);
    }

    // TODO: reinstate the "lecturer must be assigned to this course" check.

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
}
