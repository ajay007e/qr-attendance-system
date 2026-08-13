import { Pencil } from "lucide-react";
import { Badge, Button, getUserRoleLabel, USER_ROLES } from "@/shared";
import { UserActionProps, UserTableProps } from "../../types";

export default function UserTable({ users, onEdit }: UserTableProps) {
  return (
    <>
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onEdit={onEdit} />
        ))}
      </div>
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

function UserCard({ user, onEdit }: UserActionProps) {
  const disabled = user.role === USER_ROLES.SUPER_ADMIN;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            {user.first_name[0]}
            {user.last_name?.[0]}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {user.first_name} {user.last_name}
            </h3>
            <p className="truncate text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(user)}
          disabled={disabled}
          aria-label={`Edit ${user.first_name}`}
          title={disabled ? "Super Admin users cannot be edited" : "Edit User"}
        >
          <Pencil size={18} />
        </Button>
      </div>
      <div className="mt-4 flex justify-between border-t pt-4">
        <Badge variant="blue">{getUserRoleLabel(user.role)}</Badge>
        <Badge variant={user.is_active ? "green" : "red"}>
          {user.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>
    </div>
  );
}

function UserTableRow({ user, onEdit }: UserActionProps) {
  const disabled = user.role === USER_ROLES.SUPER_ADMIN;
  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {user.first_name} {user.last_name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
      <td className="px-6 py-4">
        <Badge variant="blue">{getUserRoleLabel(user.role)}</Badge>
      </td>
      <td className="px-6 py-4">
        <Badge variant={user.is_active ? "green" : "red"}>
          {user.is_active ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(user)}
          disabled={disabled}
          aria-label={`Edit ${user.first_name}`}
          title={disabled ? "Super Admin users cannot be edited" : "Edit User"}
        >
          <Pencil size={18} />
        </Button>
      </td>
    </tr>
  );
}
