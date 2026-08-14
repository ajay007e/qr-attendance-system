import { Badge, EmptyState, Pagination } from "@/shared";
import { Search } from "lucide-react";
import { useState } from "react";

interface Participant {
  id: number;
  name: string;
  email: string;
  status: "ACTIVE" | "INACTIVE";
}

const SAMPLE_PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    status: "ACTIVE",
  },
];

export function ParticipantsTab() {
  const [search, setSearch] = useState("");

  const filteredParticipants = SAMPLE_PARTICIPANTS.filter((participant) => {
    const value = search.toLowerCase();

    return participant.name.toLowerCase().includes(value) || participant.email.toLowerCase().includes(value);
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Participants</h2>

          <p className="mt-0.5 text-sm text-gray-500">Students enrolled in this course</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search participants..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>
      </div>

      {/* Table */}
      {filteredParticipants.length === 0 ? (
        <EmptyState size="sm" title="No participants found" message="Try changing your search." />
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Participant
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredParticipants.map((participant) => (
                    <tr key={participant.id} className="transition hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                            {participant.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <span className="text-sm font-medium text-gray-900">{participant.name}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">{participant.email}</td>

                      <td className="px-5 py-4">
                        <Badge variant="success">Active</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination - simulated for now */}
          <div className="flex justify-end">
            <Pagination
              total={SAMPLE_PARTICIPANTS.length}
              page={1}
              totalPages={1}
              disabled
              hasPrevious={false}
              hasNext={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
