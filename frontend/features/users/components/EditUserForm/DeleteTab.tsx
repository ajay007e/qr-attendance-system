import { Button } from "@/shared";

export function DeleteUserTab({ onDelete }: { onDelete: () => void }) {
  return (
    <div className="space-y-4 rounded-xl border border-red-200 bg-red-50 p-5">
      <h3 className="font-semibold text-red-700">Delete User</h3>

      <p className="text-sm leading-relaxed text-red-600">
        This action cannot be undone. All user related data may be removed.
      </p>

      <Button variant="danger" size="lg" fullWidth onClick={onDelete}>
        Delete User
      </Button>
    </div>
  );
}
