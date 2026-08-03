import { UserRole } from "@/features/auth";
import { UI_USER_ROLES } from "../../constants";

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
      {UI_USER_ROLES[role]}
    </span>
  );
}
