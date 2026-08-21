import { ParticipantCard } from "./ParticipantCard";
import { ParticipantTableRow } from "./ParticipantTableRow";
import { ParticipantTableProps } from "./types";

export default function ParticipantTable({ participants }: ParticipantTableProps) {
  return (
    <>
      {/* Mobile */}

      <div className="space-y-4 md:hidden">
        {participants.map((participant) => (
          <ParticipantCard key={participant.id} participant={participant} />
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
                <th className="px-6 py-4 text-left text-sm font-semibold">Participant</th>

                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {participants.map((participant) => (
                <ParticipantTableRow key={participant.id} participant={participant} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
