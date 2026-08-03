import { ComingSoon } from "@/shared";
import type { EmptyUserStateProps } from "./types";
import { Plus } from "lucide-react";

export default function EmptyUserState({ onCreate }: EmptyUserStateProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex justify-stretch sm:justify-end">
        <button
          onClick={onCreate}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>
      <ComingSoon
        title="No Users Available"
        message="Create user accounts for students, lecturers, and administrators."
        size="lg"
      />
    </div>
  );
}
