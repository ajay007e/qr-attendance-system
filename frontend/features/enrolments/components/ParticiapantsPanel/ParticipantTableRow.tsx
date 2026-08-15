import { ParticipantTableRowProps } from "./types";

export function ParticipantTableRow({ participant }: ParticipantTableRowProps) {
  const initials = [participant.firstName, participant.lastName]
    .map((name) => name?.[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <tr
      className="
        transition-colors
        hover:bg-gray-50
      "
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
            {initials}
          </div>

          <span className="text-sm font-medium text-gray-700">
            {participant.firstName} {participant.lastName}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{participant.email}</td>
    </tr>
  );
}
