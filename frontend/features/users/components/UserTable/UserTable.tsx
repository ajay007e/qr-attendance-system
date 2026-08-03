import { UserTableProps } from "./types";

import UserCard from "./UserCard";
import UserTableRow from "./UserTableRow";

export default function UserTable({ users, onEdit }: UserTableProps) {
  return (
    <>
      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onEdit={onEdit} />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <UserTableRow key={user.id} user={user} onEdit={onEdit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
