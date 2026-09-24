import type { Role } from "@/types";
import type { PaginatedData } from "@/types";

import { validateOfferingAccess } from "../offerings";

import { AttendanceSummaryRepository } from "./attendanceSummary.repository";
import { toStudentAttendanceSummary } from "./attendanceSummary.mapper";
import type { StudentAttendanceSummary, SummaryQuery } from "./attendanceSummary.types";

export class AttendanceSummaryService {
  constructor(private readonly repository: AttendanceSummaryRepository) {}

  async getSummary(
    courseOfferingId: number,
    userId: number,
    userRole: Role,
    query: SummaryQuery,
  ): Promise<PaginatedData<StudentAttendanceSummary>> {
    await validateOfferingAccess(courseOfferingId, userId, userRole);

    const totalSessions = await this.repository.countEndedSessions(courseOfferingId);
    const { items, meta } = await this.repository.getStudentAttendanceRows(courseOfferingId, query);

    return {
      items: items.map((row) => toStudentAttendanceSummary(row, totalSessions)),
      meta,
    };
  }
}