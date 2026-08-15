import type { User } from "@/shared";

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export interface UserActionProps {
  user: User;
  onEdit: (user: User) => void;
}
