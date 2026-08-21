import { Button } from "@/shared";

import { DeleteUserTabProps } from "./types";

export function DeleteUserTab({ onDelete, isActive }: DeleteUserTabProps) {
  const nextStatus = !isActive;
  return (
    <div
      className={`
        space-y-4
        rounded-xl
        border
        p-5
        ${isActive ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}
      `}
    >
      <h3
        className={`
          font-semibold
          ${isActive ? "text-red-700" : "text-green-700"}
        `}
      >
        {isActive ? "Deactivate User" : "Activate User"}
      </h3>

      <p
        className={`
          text-sm
          leading-relaxed
          ${isActive ? "text-red-600" : "text-green-600"}
        `}
      >
        {isActive
          ? "This action will deactivate the user. The user will no longer be able to use the system."
          : "This action will activate the user and restore their access to the system."}
      </p>

      <Button
        type="button"
        variant={isActive ? "danger" : "success"}
        size="lg"
        fullWidth
        onClick={() => onDelete(nextStatus)}
      >
        {isActive ? "Deactivate User" : "Activate User"}
      </Button>
    </div>
  );
}
