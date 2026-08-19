import { Badge, Button, getSessionLabel } from "@/shared";
import { Pencil } from "lucide-react";

import type { OfferingActionProps } from "./types";

export function OfferingTableRow({ offering, onEdit }: OfferingActionProps) {
  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4">
        <div>
          <p className="text-sm font-medium text-gray-700">{offering.courseCode}</p>

          <p className="mt-1 text-sm text-gray-500">{offering.courseName}</p>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{offering.academicYear}</td>

      <td className="px-6 py-4 text-sm text-gray-600">{getSessionLabel(offering.session)}</td>

      <td className="px-6 py-4 text-sm text-gray-600">
        {offering.startDate ? new Date(offering.startDate).toLocaleDateString() : "-"}
        {" – "}
        {offering.endDate ? new Date(offering.endDate).toLocaleDateString() : "-"}
      </td>

      <td className="px-6 py-4">
        <Badge variant="blue">{offering.status}</Badge>
      </td>

      <td className="px-6 py-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(offering)}
          aria-label={`Edit ${offering.courseName}`}
          title="Edit Offering"
        >
          <Pencil size={18} />
        </Button>
      </td>
    </tr>
  );
}
