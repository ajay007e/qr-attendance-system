import { User } from "../../types";

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export interface UserActionProps {
  user: User;
  onEdit: (user: User) => void;
}
