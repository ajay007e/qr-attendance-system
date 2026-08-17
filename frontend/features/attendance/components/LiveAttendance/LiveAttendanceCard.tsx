import { CheckCircle2, XCircle } from "lucide-react";

import { Badge, Button } from "@/shared";

import type { LiveAttendanceCardProps } from "./types";

export function LiveAttendanceCard({ record }: LiveAttendanceCardProps) {
  const isPresent = record.status === "present";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
            {record.firstName[0]}
            {record.lastName[0]}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {record.firstName} {record.lastName}
            </h3>

            <p className="mt-1 truncate text-sm text-gray-500">{record.email}</p>
          </div>
        </div>

        <Badge variant={isPresent ? "green" : "red"}>
          <span className="flex items-center gap-1.5">
            {isPresent ? <CheckCircle2 size={13} /> : <XCircle size={13} />}

            {isPresent ? "Present" : "Absent"}
          </span>
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400">{record.markedAt ? `Marked at ${record.markedAt}` : "Not marked"}</p>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            // Mock action for now.
          }}
        >
          {isPresent ? "Mark Absent" : "Mark Present"}
        </Button>
      </div>
    </div>
  );
}
