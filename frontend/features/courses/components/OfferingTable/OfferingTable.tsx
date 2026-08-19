import type { OfferingTableProps } from "./types";
import { OfferingCard } from "./OfferingCard";
import { OfferingTableRow } from "./OfferingTableRow";

export default function OfferingTable({ offerings, onEdit }: OfferingTableProps) {
  return (
    <>
      {/* Mobile */}

      <div className="space-y-4 md:hidden">
        {offerings.map((offering) => (
          <OfferingCard key={offering.id} offering={offering} onEdit={onEdit} />
        ))}
      </div>

      {/* Desktop */}

      <div
        className="
          hidden
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
          md:block
        "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Year</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Session</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Dates</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {offerings.map((offering) => (
                <OfferingTableRow key={offering.id} offering={offering} onEdit={onEdit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
