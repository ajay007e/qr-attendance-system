import UserEditButton from "./UserEditButton";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import { UserActionProps } from "./types";

export default function UserCard({ user, onEdit }: UserActionProps) {
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
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              font-semibold
              text-blue-600
            "
          >
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

        <UserEditButton user={user} onEdit={onEdit} />
      </div>

      <div className="mt-4 flex justify-between border-t pt-4">
        <UserRoleBadge role={user.role} />

        <UserStatusBadge active={user.is_active} />
      </div>
    </div>
  );
}
