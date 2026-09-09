import { Badge } from "@/shared";
import { AttendanceTableProps } from "./types";
import { SessionAttendance } from "../../types";

export function AttendanceTable({ records }: AttendanceTableProps) {
  return (
    <>
      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {records.map((record) => (
          <AttendanceCard key={record.student.id} record={record} />
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Marked At</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {records.map((record) => (
                <AttendanceTableRow key={record.student.id} record={record} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AttendanceCard({ record }: { record: SessionAttendance }) {
  const { student, attendance } = record;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
          {student.firstName[0]}
          {student.lastName?.[0]}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">
            {student.firstName} {student.lastName}
          </h3>
          <p className="truncate text-sm text-gray-500">{student.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Status</span>
          <AttendanceStatusBadge attendance={attendance} />
        </div>

        {attendance && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Method</span>
              <AttendanceMethodBadge method={attendance.attendanceMethod} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Location</span>
              <AttendanceLocationBadge status={attendance.locationStatus} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Marked At</span>
              <span className="text-sm font-medium text-gray-700">{formatDate(attendance.markedAt)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AttendanceTableRow({ record }: { record: SessionAttendance }) {
  const { student, attendance } = record;

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {student.firstName} {student.lastName}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>

      <td className="px-6 py-4">
        <AttendanceStatusBadge attendance={attendance} />
      </td>

      <td className="px-6 py-4">
        {attendance ? (
          <AttendanceMethodBadge method={attendance.attendanceMethod} />
        ) : (
          <span className="text-sm text-gray-400">—</span>
        )}
      </td>

      <td className="px-6 py-4">
        {attendance ? (
          <AttendanceLocationBadge status={attendance.locationStatus} />
        ) : (
          <span className="text-sm text-gray-400">—</span>
        )}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{attendance ? formatDate(attendance.markedAt) : "—"}</td>
    </tr>
  );
}

function AttendanceStatusBadge({ attendance }: { attendance: SessionAttendance["attendance"] }) {
  if (!attendance) {
    return <Badge variant="gray">Not Marked</Badge>;
  }

  const config = {
    present: {
      label: "Present",
      variant: "green" as const,
    },
    absent: {
      label: "Absent",
      variant: "red" as const,
    },
    excused: {
      label: "Excused",
      variant: "blue" as const,
    },
    late: {
      label: "Late",
      variant: "yellow" as const,
    },
  };

  const { label, variant } = config[attendance.status];

  return <Badge variant={variant}>{label}</Badge>;
}

function AttendanceMethodBadge({ method }: { method: AttendanceRecord["attendanceMethod"] }) {
  const config = {
    qr: {
      label: "QR Code",
      variant: "blue" as const,
    },
    manual: {
      label: "Manual",
      variant: "gray" as const,
    },
  };

  const { label, variant } = config[method];

  return <Badge variant={variant}>{label}</Badge>;
}

function AttendanceLocationBadge({ status }: { status: AttendanceRecord["locationStatus"] }) {
  const config = {
    verified: {
      label: "Verified",
      variant: "green" as const,
    },
    suspicious: {
      label: "Suspicious",
      variant: "yellow" as const,
    },
    not_checked: {
      label: "Not Checked",
      variant: "gray" as const,
    },
  };

  const { label, variant } = config[status];

  return <Badge variant={variant}>{label}</Badge>;
}

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
