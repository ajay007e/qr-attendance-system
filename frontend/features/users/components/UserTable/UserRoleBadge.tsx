import { getUserRoleLabel, UserRole } from "@/shared";

interface Props {
  role: UserRole;
}

export default function UserRoleBadge({ role }: Props) {
  return (
    <span
      className="
        rounded-full
        bg-blue-50
        px-3
        py-1
        text-xs
        font-medium
        text-blue-600
      "
    >
      {getUserRoleLabel(role)}
    </span>
  );
}
