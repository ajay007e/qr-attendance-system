import { UserQuery } from "../../types";

export interface UserToolbarProps {
  filters: UserQuery;
  onFiltersChange: (filters: UserQuery) => void;
}
