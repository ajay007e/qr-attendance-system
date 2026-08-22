import type { CourseOfferingQuery } from "../../types";

export interface OfferingToolbarProps {
  filters: CourseOfferingQuery;

  onFiltersChange: (filters: CourseOfferingQuery) => void;
}
