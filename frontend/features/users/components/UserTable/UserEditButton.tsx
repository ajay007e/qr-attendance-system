import { Pencil } from "lucide-react";

import { UserActionProps } from "./types";

export default function UserEditButton({ user, onEdit }: UserActionProps) {
  const disabled = user.role === "SUPER_ADMIN";

  return (
    <button
      onClick={() => onEdit(user)}
      disabled={disabled}
      className="
        rounded-lg
        p-2
        text-blue-600
        transition
        hover:bg-blue-50
        hover:text-blue-700

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:bg-transparent
        disabled:hover:text-blue-600
      "
      aria-label={`Edit ${user.first_name}`}
      title={disabled ? "Super Admin users cannot be edited" : "Edit User"}
    >
      <Pencil size={18} />
    </button>
  );
}
