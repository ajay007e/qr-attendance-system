import type { CourseOfferingListItem } from "../../types";

export interface OfferingTableProps {
  offerings: CourseOfferingListItem[];
  onEdit: (offering: CourseOfferingListItem) => void;
}

export type OfferingActionProps = {
  offering: CourseOfferingListItem;
  onEdit: (offering: CourseOfferingListItem) => void;
};
