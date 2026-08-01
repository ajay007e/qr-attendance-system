import { User } from "../types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export default function UserTable({ users, onEdit }: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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
              <tr key={user.id}>
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
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
