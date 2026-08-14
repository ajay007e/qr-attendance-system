import { ParticipantCardProps } from "./types";

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const initials = [participant.first_name, participant.last_name]
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
          {initials}
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">
            {participant.first_name} {participant.last_name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">{participant.email}</p>
        </div>
      </div>
    </div>
  );
}
