import type { AttendanceSummaryRecord } from "../../types";

interface AttendanceSummaryTableProps {
  students: AttendanceSummaryRecord[];
}

export function AttendanceSummaryTable({ students }: AttendanceSummaryTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Total Sessions</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Attended</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Missed</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Attendance %</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.studentId}>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {student.firstName} {student.lastName ?? ""}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.totalSessions}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.attendedSessions}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.missedSessions}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{student.attendancePercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
