import type { Role } from "@/types";

import { validateOfferingAccess } from "../offerings";

import { AttendanceSummaryRepository } from "./summary.repository";
import { toStudentAttendanceSummary } from "./summary.mapper";
import type { StudentAttendanceSummary } from "./summary.types";

export class AttendanceSummaryService {
  constructor(private readonly repository: AttendanceSummaryRepository) {}

  async getSummary(
    courseOfferingId: number,
    userId: number,
    userRole: Role,
  ): Promise<StudentAttendanceSummary[]> {
    await validateOfferingAccess(courseOfferingId, userId, userRole);

    const totalSessions = await this.repository.countEndedSessions(courseOfferingId);
    const rows = await this.repository.getStudentAttendanceRows(courseOfferingId);

    return rows.map((row) => toStudentAttendanceSummary(row, totalSessions));
  }
}