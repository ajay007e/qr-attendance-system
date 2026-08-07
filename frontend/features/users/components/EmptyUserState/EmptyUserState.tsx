import { Button, ComingSoon } from "@/shared";
import { Plus } from "lucide-react";
import { EmptyUserStateProps } from "../../types";

export default function EmptyUserState({ onCreate }: EmptyUserStateProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex justify-stretch sm:justify-end">
        <Button
          size="lg"
          fullWidth
          className="sm:w-auto"
          leftIcon={<Plus size={18} />}
          onClick={onCreate}
        >
          Add User
        </Button>
      </div>
      <ComingSoon
        title="No Users Available"
        message="Create user accounts for students, lecturers, and administrators."
        size="lg"
      />
    </div>
  );
}
