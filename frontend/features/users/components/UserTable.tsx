import { Pencil } from "lucide-react";
import { User } from "../types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export default function UserTable({ users, onEdit }: UserTableProps) {
  return (
    <>
      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {user.first_name[0]}
                  {user.last_name[0]}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-gray-900">
                    {user.first_name} {user.last_name}
                  </h3>

                  <p className="truncate text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <button
                onClick={() => onEdit(user)}
                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                aria-label={`Edit ${user.first_name}`}
              >
                <Pencil size={18} />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                {user.role}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  user.is_active
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
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
                <tr
                  key={user.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {user.first_name} {user.last_name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.is_active
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => onEdit(user)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                      aria-label={`Edit ${user.first_name} ${user.last_name}`}
                      title="Edit User"
                    >
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
