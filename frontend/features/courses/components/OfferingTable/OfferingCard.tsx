import { Pencil } from "lucide-react";

import { Badge, Button, getSessionLabel } from "@/shared";

import type { OfferingActionProps } from "./types";

export function OfferingCard({ offering, onEdit }: OfferingActionProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">{offering.courseCode}</h3>

          <p className="mt-1 font-medium text-gray-700">{offering.courseName}</p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(offering)}
          aria-label={`Edit ${offering.courseName}`}
          title="Edit Offering"
        >
          <Pencil size={18} />
        </Button>
      </div>

      <div className="mt-4 space-y-3 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Academic Year</span>

          <span className="font-medium">{offering.academicYear}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Session</span>

          <span className="font-medium">{getSessionLabel(offering.session)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Dates</span>

          <span className="font-medium">
            {offering.startDate ? new Date(offering.startDate).toLocaleDateString() : "-"}
            {" – "}
            {offering.endDate ? new Date(offering.endDate).toLocaleDateString() : "-"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Status</span>

          <Badge variant="blue">{offering.status}</Badge>
        </div>
      </div>
    </div>
  );
}
