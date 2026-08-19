import { AppError } from "@/utils";

import { CourseRepository } from "../courses";

import { AttendanceSessionRepository } from "./attendance-session.repository";
import { toAttendanceSession } from "./attendance-session.mapper";
import type { AttendanceSession } from "./attendance-session.types";
import { validateCourseId } from "./attendance-session.utils";

export class AttendanceSessionService {
  constructor(
    private readonly repository: AttendanceSessionRepository,
    private readonly courses: CourseRepository,
  ) {}

  async startSession(courseId: number, lecturerId: number, durationMinutes: number): Promise<AttendanceSession> {
    const validatedCourseId = validateCourseId(courseId);

    const course = await this.courses.findById(validatedCourseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const isAssigned = await this.courses.isLecturerAssigned(validatedCourseId, lecturerId);

    if (!isAssigned) {
      throw new AppError("You are not assigned to this course", 403);
    }

    const session = await this.repository.start({
      course_id: validatedCourseId,
      lecturer_id: lecturerId,
      duration_minutes: durationMinutes,
    });

    if (!session) {
      throw new AppError("An active attendance session already exists for this course", 409);
    }

    return toAttendanceSession(session);
  }
}