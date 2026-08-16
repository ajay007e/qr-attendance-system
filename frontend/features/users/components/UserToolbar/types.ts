import type { UserQuery } from "@/features/users";

export interface UserToolbarProps {
  filters: UserQuery;
  onFiltersChange: (filters: UserQuery) => void;
}
