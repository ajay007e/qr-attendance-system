import { UserActionProps } from "./types";

import UserEditButton from "./UserEditButton";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

export default function UserTableRow({ user, onEdit }: UserActionProps) {
  return (
    <tr className="transition-colors hover:bg-gray-50">
      <td className="px-6 py-4 text-sm font-medium text-gray-700">
        {user.first_name} {user.last_name}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>

      <td className="px-6 py-4">
        <UserRoleBadge role={user.role} />
      </td>

      <td className="px-6 py-4">
        <UserStatusBadge active={user.is_active} />
      </td>

      <td className="px-6 py-4">
        <UserEditButton user={user} onEdit={onEdit} />
      </td>
    </tr>
  );
}
