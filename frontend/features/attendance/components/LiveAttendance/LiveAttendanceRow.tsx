import { CheckCircle2, XCircle } from "lucide-react";

import { Badge, Button } from "@/shared";

import type { LiveAttendanceTableRowProps } from "./types";

export function LiveAttendanceTableRow({ record }: LiveAttendanceTableRowProps) {
  const isPresent = record.status === "present";

  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
            {record.firstName[0]}
            {record.lastName[0]}
          </div>

          <span className="text-sm font-medium text-gray-700">
            {record.firstName} {record.lastName}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{record.email}</td>

      <td className="px-6 py-4">
        <Badge variant={isPresent ? "green" : "red"}>
          <span className="flex items-center gap-1.5">
            {isPresent ? <CheckCircle2 size={13} /> : <XCircle size={13} />}

            {isPresent ? "Present" : "Absent"}
          </span>
        </Badge>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{record.markedAt ?? "—"}</td>

      <td className="px-6 py-4 text-right">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            // Mock action for now.
          }}
        >
          {isPresent ? "Mark Absent" : "Mark Present"}
        </Button>
      </td>
    </tr>
  );
}
