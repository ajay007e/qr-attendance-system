import type { CourseQuery } from "../../types";

export interface CourseToolbarProps {
  filters: CourseQuery;

  onFiltersChange: (filters: CourseQuery) => void;
}
