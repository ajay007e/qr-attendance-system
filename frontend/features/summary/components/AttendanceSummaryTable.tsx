"use client";

import { ClipboardList } from "lucide-react";

import { useAttendanceSummary } from "@/features/summary";
import { EmptyState, PageLoader, Section, SectionHeader } from "@/shared";

interface AttendanceSummaryTableProps {
  offeringId: number;
}

export function AttendanceSummaryTable({ offeringId }: AttendanceSummaryTableProps) {
  const { summary, loading, error } = useAttendanceSummary(offeringId);

  if (loading) {
    return <PageLoader message="Loading attendance summary..." />;
  }

  if (error) {
    return (
      <EmptyState
        icon={<ClipboardList size={28} />}
        title="Unable to load attendance summary"
        message={error.message}
      />
    );
  }

  if (summary.length === 0) {
    return (
      <EmptyState
        icon={<ClipboardList size={28} />}
        title="No enrolled students"
        message="There are no students enrolled in this course offering yet."
      />
    );
  }

  return (
    <Section>
      <SectionHeader
        title="Overall Attendance"
        subtitle="Attendance summary for all students enrolled in this course."
      />

      <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50/70">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-900">Student</th>
              <th className="px-4 py-3 font-semibold text-gray-900">Total Sessions</th>
              <th className="px-4 py-3 font-semibold text-gray-900">Attended</th>
              <th className="px-4 py-3 font-semibold text-gray-900">Missed</th>
              <th className="px-4 py-3 font-semibold text-gray-900">Attendance %</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {summary.map((student) => (
              <tr key={student.studentId}>
                <td className="px-4 py-3 text-gray-700">
                  {student.firstName} {student.lastName ?? ""}
                </td>
                <td className="px-4 py-3 text-gray-700">{student.totalSessions}</td>
                <td className="px-4 py-3 text-gray-700">{student.attendedSessions}</td>
                <td className="px-4 py-3 text-gray-700">{student.missedSessions}</td>
                <td className="px-4 py-3 text-gray-700">{student.attendancePercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}