import { Plus } from "lucide-react";

import ComingSoon from "@/components/common/ComingSoon";

interface EmptyUserStateProps {
  onCreate: () => void;
}

interface EmptyUserStateProps {
  onCreate: () => void;
}

export default function EmptyUserState({ onCreate }: EmptyUserStateProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
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
